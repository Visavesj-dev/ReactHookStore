import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrl } from "./../../Constants";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { MTableToolbar } from "material-table";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { useSelector, useDispatch } from "react-redux";
import * as stockActions from "../../actions/stock.action";
import { Typography, Grid } from "@material-ui/core";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Stock(props) {
  const dispatch = useDispatch();
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 75,
      marginBottom: 20,
     
      width: "100%",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    dispatch(stockActions.getProducts());
  }, []);

  const [state, setState] = React.useState({
    columns: [
      {
        title: "Id",
        render: (item) => <Typography variant="body1">{item.id}</Typography>,
      },
      {
        title: "Image",
        cellStyle: { padding: 0 },
        render: (item) => (
          <img
            src={`${imageUrl}/images/${item.image}?dummy=${Math.random()}`}
            style={{ width: 125, height: 100, borderRadius: "5%" }}
          />
        ),
      },
      {
        title: "Name",
        cellStyle: { minWidth: 500 },
        render: (item) => <Typography variant="body1">{item.name}</Typography>,
      },
      
      {
        title: "Price",
        render: (item) => (
          <Typography variant="body1">
            <NumberFormat
              value={item.price}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"฿"}
            />
          </Typography>
        ),
      },
      {
        title: "Stock",
        render: (item) => (
          <Typography variant="body1">
            <NumberFormat
              value={item.stock}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={0}
              fixedDecimalScale={true}
              suffix={" pcs"}
            />
          </Typography>
        ),
       
      },
      {
        title: "Updated",
        render: (item) => (
          <Typography>
            <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment>
          </Typography>
        ),
      },
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });


  const actions = [
    {
      icon: () => <Edit />,
      iconProps: { color: "primary" },
      tooltip: "Edit",
      onClick: (event, rowData) => {
        props.history.push("/stockEdit/" + rowData.id);
      },
    },
    {
      icon: () => <DeleteOutline />,
      iconProps: { color: "action" },
      tooltip: "Delete",
      onClick: (event, rowData) => {
        dispatch(stockActions.deleteProduct(rowData.id));
        
      },
    },
  ];

  return (
    <div className={classes.root}>
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <MaterialTable
          icons={tableIcons}
          title="Editable Example"
          columns={state.columns}
          data={stockReducer.result ? stockReducer.result : []}
          actions={actions}
          components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: "0px 10px" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/stockCreate"
                >
                  Create
                </Button>
              </div>
            </div>
          ),
        }}
        />
      </div>
    </div>
  );
}
