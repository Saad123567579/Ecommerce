// ProductlistAPI
export  function fetchallProducts() {
    return new Promise(async(resolve) =>{
      const response = await fetch("http://localhost:3001/products/getproduct");
      const data = await response.json();
      resolve(data);
    }
    );
  }
  