import { render, screen } from "@testing-library/vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";

describe("TheSubnav", () => {
  const renderTheSubNav = (routeName) => {
    render(TheSubnav, {
      global: {
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesome: true,
        },
      },
    });
  };

  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      const routeName = "JobResults";

      renderTheSubNav(routeName);

      const jobCount = screen.getByText("1695");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is NOT on jobs page", () => {
    it("does NOT displays job count", () => {
      const routeName = "Home";

      renderTheSubNav(routeName);

      const jobCount = screen.queryByText("1695");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
