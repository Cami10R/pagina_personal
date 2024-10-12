

const btnclick = document.getElementById("btnAddEdu");

   //  btnclick.addEventListener('click', registrar());

   //   function registrar() {
   //      alert ("Educacion Registrada") 
   //   }
   

     const respuesta = document.getElementById("resultado-busqueda"); // Corrected selector
     const btnSearch = document.getElementById("btn"); // Corrected element ID
     const tbody = document.querySelector("p");  
     
     
     document.getElementById("btn").addEventListener("click", () => {
      try {
          const searchTerm = document.getElementById("buscar").value; // Corrected casing
          if(searchTerm === "") { // Use === for strict comparison
            const audio = new Audio('Audio/Efecto de Sonido Error W indows XP - Musica y Efectos de Sonido de memes sin Copyright (youtube).mp3');
            audio.play();
            
              alert("Debes ingresar un valor");
              return; // Detener la ejecución si no hay término de búsqueda
          }
          searchID(searchTerm);
      } catch (error) {
          console.error(error);
          // Aquí puedes agregar un mensaje más específico para el usuario,
          // por ejemplo: alert("Ocurrió un error: " + error.message);
      }
  });
       
     

          
     function searchID(searchTerm) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${searchTerm}`) // Corrected URL format
        .then((response) => {
          if (!response.ok) { // Check for non-200 status codes (including 400)
            if (response.status === 404) { // Check specifically for 400 error
              return Promise.reject(new Error("No result found")); // Reject with informative error
            }
            return Promise.reject(new Error("Error fetching data: " + response.status)); // Reject with informative error
          }
          return response.json();
        })
        .then((data) => {
          const respuesta = document.getElementById("resultado-busqueda"); // Assuming "respuesta" is the element ID
          if (data.length === 0) { // Handle potential empty response (valid data but no results)
            respuesta.innerHTML = "No results found for your search.";
          } else {
            let tableRow = `
              <p> ID: ${data.id}</p>
              <p>Title: ${data.title}</p>
              <p>Body: ${data.body}</p> 
              <p>User ID: ${data.userId}</p>
            `;
            respuesta.innerHTML = tableRow; // Update innerHTML once
          }
        })
        .catch((error) => { // Handle potential fetch errors and rejected promises
          console.error("Error fetching data:", error);
          respuesta.innerHTML = "No result found for your search"; // Display "No result found" for both 400 and other errors
        });
    }
    
     
     
