import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFiltersSideBarOrganizations from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";

describe("JobFiltersSideBarOrganizations", () => {
  it("renders unique list of organizations from jobs", async () => {
    const pinia = createTestingPinia();
    const jobStore = useJobsStore();
    jobStore.UNIQUE_ORGANIZATIONS = new Set(["Google", "Amazon"]);

    render(JobFiltersSideBarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesome: true,
        },
      },
    });

    const button = screen.getByRole("button", { name: /organizations/i });
    await userEvent.click(button);

    const organizationsListItems = screen.getAllByRole("listitem");
    const organizations = organizationsListItems.map(
      (node) => node.textContent
    );
    expect(organizations).toEqual(["Google", "Amazon"]);
  });
});
