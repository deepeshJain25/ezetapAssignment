export const data = [
  {
    name: "Ready Player One",
    cast: ["Tye Sheridan", "Olivia"],
    language: "English",
    genre: "Action/Sci-fi",
    locations: ["Delhi", "Chandigarh", "Bangalore"],
    location: [
      { id: 100, name: 'Delhi'},
      { id: 101, name: 'Chandigarh'},
      { id: 102, name: 'Bangalore'}
    ],
    theatres: {
      100: [
        {
          name: "PVR 1",
          location: "test loc 1",
          price: 100,
          shows: "10:00,12:00,17:00",
        },
        {
          name: "PVR 2",
          location: "test loc 2",
          price: 120,
          shows: "10:00,12:00,17:00",
        },
        {
          name: "PVR 3",
          location: "test loc 3",
          price: 150,
          shows: "10:00,12:00,17:00",
        },
      ],
      101: [
        {
          name: "IMAX 1",
          location: "test loc 1",
          price: 100,
          shows: "10:00,12:00,17:00",
        },
        {
          name: "IMAX 2",
          location: "test loc 3",
          price: 150,
          shows: "10:00,12:00,17:00",
        },
      ],
      102: [
        {
          name: "PVR 6",
          location: "test loc 2",
          price: 120,
          shows: "10:00,12:00,17:00",
        },
      ],
    },
  },
];
