---
date: 2026-09-02
task: Set up the prompts/ folder convention for logging every prompt that results in a meaningful project change
category: meta
---

Create a prompts folder at the root of this project. From now on, whenever I give you a prompt that results in a meaningful change to the project, save a copy of my prompt in this folder as a Markdown file. Number the files sequentially and use descriptive filenames. Do not modify the original prompt when saving it. Include the date and a brief description of the task in the file metadata. Also add the meaning prompts I have given you so far like clearing the existing styling and design direction. For example, I want the folder to look like this  prompts/
├── features/
│   ├── authentication.md
│   └── payments.md
├── ui/
│   ├── navbar.md
│   └── dashboard.md
├── debugging/
│   ├── router-error.md
│   └── api-error.md
└── README.md
