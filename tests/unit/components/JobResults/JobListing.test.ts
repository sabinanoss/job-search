import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import type { Job } from "@/api/types";
import { createJob } from "../../../utils/createJob";

import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...job,
        },
      },
    });
  };

  it("renders job title", () => {
    const jobProps = createJob({ title: "Vue programmer" });
    renderJobListing(jobProps);
    expect(screen.getByText("Vue programmer")).toBeInTheDocument();
  });

  it("renders job organizations", () => {
    const jobProps = createJob({ organization: "Google" });
    renderJobListing(jobProps);
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJob({
      locations: ["Orlando", "Jacksonville"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Orlando")).toBeInTheDocument();
    expect(screen.getByText("Jacksonville")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const jobProps = createJob({
      minimumQualifications: ["Bachelor's degree", "3 years experience"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Bachelor's degree")).toBeInTheDocument();
    expect(screen.getByText("3 years experience")).toBeInTheDocument();
  });
});
