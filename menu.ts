export const MENU_ITEM_PREFIX = "openaiapiexp";
export const PROMPT_STUB = "<<prompt>>";

// Define the menu items
export const menuItems = [
    { id: `${MENU_ITEM_PREFIX}Parent`, 
    visible: true, 
    title: "OpenAI API Explorer" },
    // {
    //   id: `openaiapiWAIT`,
    //   parentId: `${MENU_ITEM_PREFIX}Parent`,
    //   visible: true, 
    //   title: "Wait",
    // },
    // {
    //   id: `openaiapiERROR`,
    //   parentId: `${MENU_ITEM_PREFIX}Parent`,
    //   visible: true, 
    // title: "Error",
    // },
    // {
    //   id: `openaiapiSAMPLE`,
    //   parentId: `${MENU_ITEM_PREFIX}Parent`,
    //   visible: true, 
    // title: "Sample",
    // },
    {
      id: `${MENU_ITEM_PREFIX}child1`,
      parentId: `${MENU_ITEM_PREFIX}Parent`,
      visible: true, 
      title: "Summarize",
      config: {
        model: "gpt-4o-mini",
        messages: [{role: "user", content: `Summarize this for a second-grade student:\n\n${PROMPT_STUB}`}],
        temperature: 0.7,
        max_tokens: 264,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
      id: `${MENU_ITEM_PREFIX}answer`,
      parentId: `${MENU_ITEM_PREFIX}Parent`,
      visible: true, 
      title: "Answer the question",
      config: {
        model: "gpt-4o-mini",
        messages: [{role: "user", content: `Answer the question please:\n\n${PROMPT_STUB}`}],
        temperature: 0.7,
        max_tokens: 264,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
      id: `${MENU_ITEM_PREFIX}child2`,
      parentId: `${MENU_ITEM_PREFIX}Parent`,
      visible: true, 
      title: "Grammar correction",
      config: {
        model: "gpt-4o-mini",
        messages: [{role: "user", content: `Correct this to standard English:\n\n${PROMPT_STUB}`}],
        temperature: 0,
        max_tokens: 260,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
      id: `${MENU_ITEM_PREFIX}child3`,
      parentId: `${MENU_ITEM_PREFIX}Parent`,
      visible: true, 
      title: "Extract keywords",
      config: {
        model: "gpt-4o-mini",
        messages: [{role: "user", content: `Extract keywords from this text:\n\n${PROMPT_STUB}`}],
        temperature: 0.5,
        max_tokens: 260,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0,
      },
    },
    {
      id: `${MENU_ITEM_PREFIX}child4`,
      parentId: `${MENU_ITEM_PREFIX}Parent`,
      visible: true, 
      title: "TL;DR summarization",
      config: {
        model: "gpt-4o-mini",
        messages: [{role: "user", content: `${PROMPT_STUB}\n\nTl;dr`}],
        temperature: 0.7,
        max_tokens: 260,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 1,
      },
    },
    {
      id: `${MENU_ITEM_PREFIX}child5`,
      parentId: `${MENU_ITEM_PREFIX}Parent`,
      visible: true, 
      title: "Analogy maker",
      config: {
        model: "gpt-4o-mini",
        messages: [{role: "user", content: `Create an analogy for this phrase:\n\n${PROMPT_STUB}`}],
        temperature: 0.5,
        max_tokens: 260,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
    },
    {
        id: `${MENU_ITEM_PREFIX}menuitem1`,
        parentId: `${MENU_ITEM_PREFIX}Parent`,
        visible: false,
        title: "Custom item 1",
        config: {
            model: "gpt-4o-mini",
            messages: [{role: "user", content: ``}],
            temperature: 0.5,
            max_tokens: 260,
            top_p: 1.0,
            frequency_penalty: 0.8,
            presence_penalty: 0.0,
          },
    },
    {
        id: `${MENU_ITEM_PREFIX}menuitem2`,
        parentId: `${MENU_ITEM_PREFIX}Parent`,
        visible: false,
        title: "Custom item 2",
        config: {
            model: "gpt-4o-mini",
            messages: [{role: "user", content: ``}],
            temperature: 0.5,
            max_tokens: 260,
            top_p: 1.0,
            frequency_penalty: 0.8,
            presence_penalty: 0.0,
          },
    }
    // {
    //   id: `${MENU_ITEM_PREFIX}child6`,
    //   parentId: `${MENU_ITEM_PREFIX}Parent`,
    //   visible: true, 
    // title: "Child 6",
    // },
    // {
    //   id: `${MENU_ITEM_PREFIX}child7`,
    //   parentId: `${MENU_ITEM_PREFIX}Parent`,
    //   visible: true, 
    // title: "Child 7",
    // },
  ];
  