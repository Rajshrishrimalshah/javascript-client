/* eslint-disable no-unused-vars */
import AddDialog from "../Trainee/components/AddDialog/AddDialog";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveDialog from "./components/RemoveDialog/RemoveDialog";
import EditIcon from "@material-ui/icons/Edit";
import EditDialog from "./components/EditDialog/EditDialog";
import Form from "../Trainee/Form";
import moment from "moment";
import LocalStorageMethods from "../../contexts/snackBarProvider/LocalStorageMethods";
import trainees from "./data/trainee";
import Table from "../Table/Table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withSnackBarConsumer } from "../../contexts/snackBarProvider/withSnackBarConsumer";
import { callApi } from "../../lib/utils/api"
import * as dotenv from 'dotenv';

dotenv.config();

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: "",
      order: "asc",
      page: 0,
      user: {
        name: "",
        email: "",
        password: ""
      },
      openEditDialog: false,
      openDeleteDialog: false,
      currentUser: {}
    };
  }

  componentDidMount = async () => {
    const { getItem } = this.props;
    try{
      const res = await callApi({
        url: process.env.REACT_APP_BASE_URL + process.env.REACT_APP_FETCH_DETAIL,
        method:'get',
        headers: {
          Authorization: getItem("token")
        }
      })
      console.log('success', res.data.data.records[0]);
    }catch(error){
      const err= error.response.data.message;
      console.log(err);
    }
  }


  handleClick = () => {
    const { open } = this.state;
    this.setState({
      open: open ? false : true
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      openEditDialog: false,
      openDeleteDialog: false
    });
  };

  handleEditDialogueOpen = async(obj) => {
    this.setState({
      openEditDialog: true,
      currentUser: obj
    });
  };

  handleRemoveDialogueOpen = obj => {
    this.setState({
      openDeleteDialog: true,
      currentUser: obj
    });
  };

  onDeleteSubmit = obj => {
    console.log("Delete Operation-->", obj);
    const { snackBarOpen } = this.props;
    const check = moment(obj.createdAt).isAfter("2019-02-14");

    check
      ? snackBarOpen("This is a success message !", "success")
      : snackBarOpen("This is an error message !", "error");
  };

  handleDataParent =  (name, email, password) => async (event) => {
    const { user, open } = this.state;
    const { snackBarOpen, getItem } = this.props;
    user["name"] = name;
    user["email"] = email;
    user["password"] = password;
    this.setState({
      open: open ? false : true
    });

    try{
      const res = await callApi({
        url: process.env.REACT_APP_BASE_URL + process.env.REACT_APP_TRAINEE,
        method:'post',
        data: {
          name,
          email,
          password,
        },
        headers: {
          Authorization: getItem("token")
        }
      })
      snackBarOpen(res.data.message, "success");
      console.log('success', res);
    }catch(error){
      const err= error.response.data.message;
      snackBarOpen(err, "Error");
    }
  };

  getDateFormatted = date => {
    return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
  };

  handleSort = (event, property) => {
    const { order, orderBy } = this.state;
    const isDesc = orderBy === property && order === "desc";
    console.log(this.state);
    this.setState({
      order: isDesc ? "asc" : "desc",
      orderBy: property
    });
  };
  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  clickHandler = () => {
    const { edit } = this.state;
    this.setState({
      edit: edit ? false : true
    });
  };

  render() {

    const {
      open,
      order,
      orderBy,
      page,
      openEditDialog,
      openDeleteDialog,
      currentUser
    } = this.state;
    const { match } = this.props;

    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleClick}>
          Add TRAINEE LIST
        </Button>
        <AddDialog openProp={open} clickHandler={this.handleClick}>
          <Form
            handlerFromParent={this.handleDataParent}
            clickHandler={this.handleClick}
          />
        </AddDialog>

        {openEditDialog && (
          <EditDialog
            open={openEditDialog}
            onClose={this.handleClose}
            data={currentUser}
          />
        )}
        <RemoveDialog
          open={openDeleteDialog}
          onClose={this.handleClose}
          data={currentUser}
          onSubmit={this.onDeleteSubmit}
        />
        <Table
          id="id"
          data={trainees}
          column={[
            { field: "name", label: "Name", align: "center" },
            {
              field: "email",
              label: "Email Address",
              format: value => value && value.toUpperCase()
            },
            {
              field: "createdAt",
              label: "Date",
              align: "right",
              format: this.getDateFormatted
            }
          ]}
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogueOpen
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogueOpen
            }
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          page={page}
          onChangePage={this.handleChangePage}
        />


        {/* <ul>
          {trainees.map(({ id, name }) => (
            <li key={id}>
              <Link to={`${match.url}/${id}`}> {name} </Link>
            </li>
          ))}
        </ul> */}
      </>
    );
  }
}

export default LocalStorageMethods(withSnackBarConsumer(TraineeList));
