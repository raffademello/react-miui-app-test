import React, { useState } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import AddItems from "./AddItems";

const Home = () => {
	const [dynamicItems, setDynamicItems] = useState([]);
	const [jsonDataArray, setJsonDataArray] = useState([]);
  
	const addDynamicItem = () => {
	  setDynamicItems([...dynamicItems, { id: dynamicItems.length + 1 }]);
	};
  
	const handleSaveData = (jsonData) => {
	  setJsonDataArray([...jsonDataArray, jsonData]);
	};
  
	const deleteItem = (id) => {
	  const updatedItems = dynamicItems.filter((item) => item.id !== id);
	  setDynamicItems(updatedItems);
	  const updatedJsonDataArray = jsonDataArray.filter(
		(item) => item.outputdata.id !== id
	  );
	  setJsonDataArray(updatedJsonDataArray);
	};
  
	const handleSaveAndSend = () => {
	  const payload = {
		items: jsonDataArray,
	  };
  
	  console.log(payload);
	};
  
	return (
	  <Container maxWidth="lg">
		<Box className="add-items-wrap">
		  <Button onClick={addDynamicItem} variant="contained">
			Adicionar Itens
		  </Button>
		</Box>
  
		<div>
		  {dynamicItems.map((item) => (
			<AddItems
			  key={item.id}
			  onRemove={() => deleteItem(item.id)}
			  onSave={handleSaveData}
			/>
		  ))}
		  <div>
			{jsonDataArray && jsonDataArray.length > 0 && (
			  <ul className="result-items-wrap">
				{jsonDataArray.map((item, index) => (
				  <li key={index}>
					<pre>{JSON.stringify(item, null, 2)}</pre>
					<Button
					  onClick={() => deleteItem(item.outputdata.id)}
					  variant="contained"
					>
					  Excluir Item
					</Button>
				  </li>
				))}
			  </ul>
			)}
		  </div>
		  {dynamicItems && dynamicItems.length > 0 && (
			<Box className="d-flex flex-column flex-md-row">
			  <Button onClick={handleSaveAndSend} variant="contained">
				Salvar e Enviar
			  </Button>
			  <Typography className="ml-md-3 mt-3 mt-md-0" variant="h5" component="h2">
				Abra o console do navegador para ver o resultado
			  </Typography>
			</Box>
		  )}
		</div>
	  </Container>
	);
  };
  
  export default Home;
