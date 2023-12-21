const animals = [
  {
    id: Math.random(),
    name: "lion",
    img: "https://www.krugerpark.co.za/images/black-maned-lion-shem-compion-786x500.jpg",
  },
  {
    id: Math.random(),
    name: "cat",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1200px-RedCat_8727.jpg",
  },
  {
    id: Math.random(),
    name: "dog",
    img: "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
  },
];

localStorage.setItem("animals", JSON.stringify(animals));