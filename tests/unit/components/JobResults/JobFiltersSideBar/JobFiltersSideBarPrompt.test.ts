import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";

import JobFiltersSideBarPrompt from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarPrompt.vue";

describe("JobFiltersSideBarPrompt", () => {
  describe("when user clicks Clear Filters button", () => {
    it("sends message to clear all of user's job search filters", async () => {
      const pinia = createTestingPinia();
      const userStore = useUserStore();

      render(JobFiltersSideBarPrompt, {
        global: {
          plugins: [pinia],
        },
      });

      const button = screen.getByRole("button", { name: /clear filters/i });
      await userEvent.click(button);

      expect(userStore.CLEAR_USER_JOB_FILTER_SELECTIONS).toHaveBeenCalled();
    });
  });
});
