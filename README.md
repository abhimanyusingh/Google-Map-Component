
**Google-Map-Component**
> Outline

Create a modern and interactive SPA that showcases a full-screen map that

displays defined geo-json polygons on it.

Clicking on them should reveal a panel that shows meta information.

> Features

- Create a map component and display Berlin as the center [52.520008,

13.404954]

- Fetch data from the provided frontend-geo.json file: https://drive.google.com/file/d/1G5bC34-DPL0YWSxfryCu5VfS6a6nwnlu/view

- Display district polygons on the map

 - Apply different colors to the polygons based on the average age of the district

    <= 40 = #00cb09
    
    <= 42 = #a4cb00
    
    <= 43 = #cb8a00
    
    <= 45 = #cb4f00
    
    <= 50 = #cb0026

- On polygon click show in an appropriate UI:

1. Name
2. Population
3. Average age
4. Calculated area in square kilometers
5. Calculated length of the outline of the area in kilometers
  
  > Project Setup

```bash

git clone https://github.com/abhimanyusingh/Google-Map-Component.git

cd google-map-component

npm install

```

  

Create a `.env` file for environment variables in your server.

  

You can start the server on its own with the command:

  

```bash

npm run server

```

  

Run the React application on its own with the command:

  

```bash

npm start

```

  

Run both applications together with the command:

  

```bash

npm run dev

```

  

The React application will run on port 3000 and the server port 3001.