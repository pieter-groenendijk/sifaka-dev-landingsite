export interface Milestone {
    timeLabel: string,
    title: string,
    summary: string,
    keyPoints: string[],
}

export const milestones: Milestone[] = [
    {
        timeLabel: "March 2026",
        title: "The Outer Shell",
        summary: "UI & presentational logic as to define an optimized incremental workflow before any heavy logic is put in.",
        keyPoints: [
            "Diagram notations",
            "Projects & workspaces",
            "Incremental workflow",
            "(MongoDB taken as case)",
        ],
    },
    {
        timeLabel: "April 2026",
        title: "The Steering Wheel",
        summary: "The core that facilitates operating on a project. Be that the user, or the automation.",
        keyPoints: [
            "Fundamental project & diagram operations",
            "Imports & exports",
            "Organizational preconditions",
            "(MongoDB taken as case)",
        ],
    },
    {
        timeLabel: "June 2026",
        title: "Cruise Control",
        summary: "The complex automation empowering the workflow, letting you focus on things that matter.",
        keyPoints: [
            "Schema generation & synchronization",
            "Change propagation",
            "(MongoDB taken as case)",
        ],
    },
    {
        timeLabel: "July 2026",
        title: "Sat Nav",
        summary: "Functions that inform and guide you into making more better decisions in an effect-driven manner.",
        keyPoints: [
            "Real-time validation",
            "Structural options",
            "Context-aware actions",
            "(MongoDB taken as case)",
        ],
    },
    {
        timeLabel: "Looking ahead",
        title: "Beyond",
        summary: "This is as far the roadmap will go for now. The rest is still up for debate. Open for suggestions!",
        keyPoints: [
            "Broadening compatibility",
            "To be decided"
        ],
    },
];