export interface Milestone {
    timeLabel: string,
    title: string,
    summary: string,
    keyPoints: string[],
}

export const milestones: Milestone[] = [
    {
        timeLabel: "March 2026",
        title: "The outer shell",
        summary: "UI & presentational logic as to define an optimized incremental workflow before any heavy logic is put in.",
        keyPoints: [
            "Diagram notations",
            "Projects & workspaces",
            "Incremental workflow",
            "(MongoDB taken as case)"
        ],
    },
    {
        timeLabel: "April 2026",
        title: "The steering wheel",
        summary: "The core that facilitates operating on a project. Be that the user, or the automation.",
        keyPoints: [
            "Fundamental project operations",
            "Fundamental diagram operations",
            "(MongoDB taken as case)"
        ],
    },
    {
        timeLabel: "May 2026",
        title: "Cruise control",
        summary: "The complex automation empowering the workflow, letting you focus on things that matter.",
        keyPoints: [
            "Schema generation & synchronization",
            "Change propagation",
            "(MongoDB taken as case)"
        ],
    },
    {
        timeLabel: "June 2026",
        title: "Sat nav",
        summary: "Functions that inform and guide you with making effective decisions.",
        keyPoints: [
            "Real-time validation",
            "Structural options",
            "Context-aware actions",
            "(MongoDB taken as case)"
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