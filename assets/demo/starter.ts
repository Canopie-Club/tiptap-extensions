export const starterData = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Welcome to your new editor! Type / on a new line to add content blocks.",
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "heading",
          attrs: {
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "BLOCK",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is a block quote",
            },
          ],
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "one",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "two",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "three",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
