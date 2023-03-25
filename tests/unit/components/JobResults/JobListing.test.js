import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "AirBnB",
    locations: ["New York"],
    minimumQualifications: ["Bachelor's degree"],
    ...jobProps,
  });

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
        },
      },
    });
  };

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "Vue programmer" });
    renderJobListing(jobProps);
    expect(screen.getByText("Vue programmer")).toBeInTheDocument();
  });

  it("renders job organizations", () => {
    const jobProps = createJobProps({ organization: "Google" });
    renderJobListing(jobProps);
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJobProps({
      locations: ["Orlando", "Jacksonville"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Orlando")).toBeInTheDocument();
    expect(screen.getByText("Jacksonville")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Bachelor's degree", "3 years experience"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Bachelor's degree")).toBeInTheDocument();
    expect(screen.getByText("3 years experience")).toBeInTheDocument();
  });
});
