export const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    dashboardItems: [
      {
        id: "1",
        title: "Sample Chart",
        data: {
          labels: ["Jan", "Feb", "Mar"],
          values: [10, 20, 30],
        },
        created: "2024-01-01T00:00:00.000Z",
        lastModified: "2024-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        title: "Sample Table",
        data: {
          headers: ["Name", "Value"],
          rows: [
            ["Item 1", 100],
            ["Item 2", 200],
          ],
        },
        created: "2024-01-02T00:00:00.000Z",
        lastModified: "2024-01-02T00:00:00.000Z",
      },
    ],
  },
];
