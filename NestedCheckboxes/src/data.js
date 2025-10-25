export const initalState = {
  id: 1,
  label: "Parent 1",
  isChecked: false,
  children: [
    {
      id: 2,
      label: "Parent 2",
      isChecked: false,
      children: [
        {
          id: 6,
          label: "Child 1",
          isChecked: false,
          children: [],
        },
        {
          id: 7,
          label: "Child 2",
          isChecked: false,
          children: [],
        },
        {
          id: 8,
          label: "Child 3",
          isChecked: false,
          children: [
            {
              id: 9,
              label: "Child 4",
              isChecked: false,
              children: [],
            },
            {
              id: 10,
              label: "Child 5",
              isChecked: false,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      label: "Parent 3",
      isChecked: false,
      children: [],
    },
    {
      id: 4,
      label: "Parent 4",
      isChecked: false,
      children: [],
    },
    {
      id: 5,
      label: "Parent 5",
      isChecked: false,
      children: [],
    },
  ],
};
