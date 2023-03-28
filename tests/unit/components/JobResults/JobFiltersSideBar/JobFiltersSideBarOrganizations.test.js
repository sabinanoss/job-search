import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { vi } from "vitest";

describe("JobFiltersSideBarOrganizations", () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    const userStore = useUserStore();
    const $router = { push: vi.fn() };

    render(JobFiltersSideBarOrganizations, {
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

  it("renders unique list of organizations from jobs", async () => {
    const { jobStore } = renderJobFiltersSidebarOrganizations();
    jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const organizationsListItems = screen.getAllByRole("listitem");
    const organizations = organizationsListItems.map(
      (node) => node.textContent
    );
    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for organization", async () => {
      const { jobStore, userStore } = renderJobFiltersSidebarOrganizations();
      jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

      const button = screen.getByRole("button", { name: /organizations/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith([
        "Google",
      ]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const { jobStore, $router } = renderJobFiltersSidebarOrganizations();
      jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google"]);

      const button = screen.getByRole("button", { name: /organizations/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
