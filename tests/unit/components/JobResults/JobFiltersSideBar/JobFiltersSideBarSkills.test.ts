import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";

import JobFiltersSideBarSkills from "@/components/JobResults/JobFiltersSideBar/JobFiltersSideBarSkills.vue";

describe("JobFiltersSideBarSkills", () => {
  const renderJobFiltersSideBarSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();

    render(JobFiltersSideBarSkills, {
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it("populate search input from store", async () => {
    const { userStore } = renderJobFiltersSideBarSkills();
    userStore.skillsSearchTerm = "Programmer";

    const input = await screen.findByRole<HTMLInputElement>("textbox");

    expect(input.value).toBe("Programmer");
  });

  it("writes user input to store", async () => {
    const { userStore } = renderJobFiltersSideBarSkills();
    userStore.skillsSearchTerm = "";

    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "V");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith("V");
  });

  it("removes whitespace from user input", async () => {
    const { userStore } = renderJobFiltersSideBarSkills();
    userStore.skillsSearchTerm = "";

    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "   Vue Developer   ");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith(
      "Vue Developer"
    );
  });
});
