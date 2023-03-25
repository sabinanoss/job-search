import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import MainNav from "@/components/Navigation/MainNav.vue";
import { useUserStore } from "@/stores/user";

describe("MainNav", () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia();
    const $route = {
      name: "Home",
    };

    render(MainNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
        stubs: {
          FontAwesome: true,
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  it("it displays company name", () => {
    renderMainNav();
    const companyName = screen.getByText("Job Search");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    renderMainNav();
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map(
      (item) => item.textContent
    );
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Benefits",
      "Jobs",
      "Students",
    ]);
  });

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      renderMainNav();
      const userStore = useUserStore();

      let profileImage = screen.queryByRole("img", {
        name: /Profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /Sign in/i,
      });
      userStore.isLoggedIn = true;
      await userEvent.click(loginButton);

      profileImage = screen.queryByRole("img", {
        name: /Profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
