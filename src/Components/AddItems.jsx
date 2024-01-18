import React, { useState, useEffect } from "react";
import {
  InputLabel,
  FormControl,
  Box,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import listaInput from "../Service/lista-input.json";
import listaFuncoes from "../Service/lista-funcoes.json";


const AddItems = ({ onRemove, onSave }) => {
  const [listInputs, setListInputs] = React.useState("");
  const [listParams, setListParams] = React.useState("");
  const [functionDropDown, setfunctionDropDown] = useState("");
  const [paramDropDown, setParamDropDown] = useState([]);
  const [columnNamesDropDown, setcolumnNamesDropDown] = useState([]);
  const [selectedParam, setSelectedParam] = useState("");
  const [inputLIT, setInputLIT] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [supportedDataTypes, setSupportedDataTypes] = useState("");
  const [columns, setColumns] = useState([]);


  const handleChangeInputs = (event) => {
    setListInputs(event.target.value);
	setfunctionDropDown("");
	let newColumns = [];
    switch (event.target.value) {
      case "file1.csv":
        newColumns = listaInput.inputList[0].columns;
        break;
      case "file2.csv":
		newColumns = listaInput.inputList[1].columns;
        break;
      case "file3.csv":
        newColumns = listaInput.inputList[2].columns;
        break;
      default:
        return [];
    }

	setColumns(newColumns);
  	console.log("columns", newColumns);
  };

  const handleFirstDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setfunctionDropDown(selectedValue);

    const optionsForParamDropdown = getOptionsForSecondDropdown(selectedValue);
    const optionsForFunctionTypeDropdown = getOptionsForFunctionTypeDropdown(selectedValue);
    setParamDropDown(optionsForParamDropdown);

    // Filtrar apenas as colunas cujo columnType está presente no supportedDataTypes da função selecionada
    const filteredColumns = columns.filter((column) =>
      optionsForFunctionTypeDropdown.includes(column.columnType)
    );

    setcolumnNamesDropDown(filteredColumns.map((column) => column.columnName));
  };


	const getOptionsForSecondDropdown = (event) => {

		switch (event) {
			case "somar":
				return listaFuncoes.data[0].supportedValueTypes;
			case "subtrair":
				return listaFuncoes.data[1].supportedValueTypes;
			case "filtrar":
				return listaFuncoes.data[2].supportedValueTypes;
			default:
				return [];
		}
	};

  const getOptionsForFunctionTypeDropdown = (event) => {
    switch (event) {
      case "somar":
        return listaFuncoes.data[0].supportedDataTypes;
      case "subtrair":
        return listaFuncoes.data[1].supportedDataTypes;
      case "filtrar":
        return listaFuncoes.data[2].supportedDataTypes;
      default:
        return [];
    }
  };


  const handleChangeParams = (event) => {
    setListParams(event.target.value);
    setSelectedParam(event.target.value);
  };

  const handleChangeSupportedDataTypes = (event) => {
    setSupportedDataTypes(event.target.value);
  };

  const handleInputLITChange = (event) => {
    setInputLIT(event.target.value);
  };

  const saveData = () => {
    let jsonData;

    if (selectedParam === "COL" && supportedDataTypes) {
      const selectedColumn = columns.find(
        (column) => column.columnName === supportedDataTypes
      );

      if (selectedColumn) {
        jsonData = {
          outputdata: {
            id: Date.now(),
            cells: [
              {
                id: Date.now(),
                functionName: functionDropDown,
                param: {
                  type: "COL",
                  column: {
                    columnId: selectedColumn.columnId,
                    columnName: selectedColumn.columnName,
                    columnType: selectedColumn.columnType,
                  },
                },
              },
            ],
          },
        };
      }
    } else if (selectedParam === "LIT") {
      jsonData = {
        outputdata: {
          id: Date.now(),
          cells: [
            {
              id: Date.now(),
              functionName: functionDropDown,
              param: {
                type: "LIT",
                literalValue: inputLIT,
              },
            },
          ],
        },
      };
    }

    onSave(jsonData);
    setIsVisible(false);
  };

  const deleteItem = () => {
    onRemove();
  };

  useEffect(() => {
  }, [listInputs]);

   return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
	  className="items"
      sx={{
        "& > :not(button)": { m: 1, width: "25ch" },
      }}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Escolha Input</InputLabel>
        <Select
          value={listInputs}
          label="Escolha Input"
          onChange={handleChangeInputs}
        >
          {listaInput.inputList.map((item, index) => (
            <MenuItem key={index} value={item.fileName}>
              {item.fileName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">
          Escolha uma função
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={functionDropDown}
          label="Escolha Função"
          onChange={handleFirstDropdownChange}
        >
          {listaFuncoes.data.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {paramDropDown.length > 0 && (
        <>
          <FormControl>
            <InputLabel>Escolha um tipo de parâmetro</InputLabel>
            <Select
              value={listParams}
              label="Escolha Input"
              onChange={handleChangeParams}
            >
              {paramDropDown.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      {functionDropDown.length > 0 && (
        <>
          <FormControl>
            {selectedParam === "COL" ? (
              <>
                <InputLabel>Escolha o supportedDataTypes</InputLabel>
                <Select
                  value={supportedDataTypes}
                  label="Escolha o columnName"
                  onChange={handleChangeSupportedDataTypes}
                >
                  {columnNamesDropDown.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </>
            ) : (
              <TextField
                id="outlined-basic"
                label="Insira um valor numérico"
                variant="outlined"
                onChange={handleInputLITChange}
                value={inputLIT}
              />
            )}
          </FormControl>
        </>
      )}

      <div className="d-flex justify-content-center">
	  {
		isVisible &&
        <Tooltip title="Add" onClick={saveData}>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      }
      <Tooltip title="Delete" onClick={deleteItem}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
	  </div>
    </Box>
  );
};

export default AddItems;
