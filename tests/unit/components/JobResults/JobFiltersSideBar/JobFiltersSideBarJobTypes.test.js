import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSideBarJobTypes from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarJobTypes.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { vi } from "vitest";

describe("JobFiltersSideBarJobTypes", () => {
  const renderJobFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };

    render(JobFiltersSideBarJobTypes, {
      global: {
        plugins: [pinia],
        mocks: {
          $router,
        },
        stubs: {
          FontAwesome: true,
        },
      },
    });

    return { jobStore, userStore, $router };
  };

  it("renders unique list of job type from jobs", async () => {
    const { jobStore } = renderJobFiltersSidebarJobTypes();
    jobStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for job type", async () => {
      const { jobStore, userStore } = renderJobFiltersSidebarJobTypes();
      jobStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        "Full-time",
      ]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const { jobStore, $router } = renderJobFiltersSidebarJobTypes();
      jobStore.UNIQUE_JOB_TYPES = new Set(["Full-time"]);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });

      await userEvent.click(fullTimeCheckbox);

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
