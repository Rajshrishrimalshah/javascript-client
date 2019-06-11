import AddDialog from "../Trainee/components/AddDialog/AddDialog";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EditDialog from "./components/EditDialog/EditDialog";
import Form from "../Trainee/Form";
import moment from "moment";
import trainees from "./data/trainee";
import Table from "../Table/Table";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      edit: false,
      orderBy: "",
      order: "asc",
      page: 0,
      user: {
        name: "",
        email: "",
        password: ""
      },
      selectedRow: []
    };
  }

  handleClick = () => {
    const { open } = this.state;
    this.setState({
      open: open ? false : true
    });
  };

  handleDataParent = (name, email, password) => event => {
    const { user, open } = this.state;
    user["name"] = name;
    user["email"] = email;
    user["password"] = password;
    this.setState({
      open: open ? false : true
    });

    console.log(this.state.user);
  };

  getFormattedDate = date => {
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

  handleEditDialogOpen = index => (event) => {
    //console.log('Id', index);
    const details =  trainees.filter(trainee => index === trainee.id);
   // console.log(details);
    const { edit } = this.state;
    this.setState({
      edit: edit ? false : true,
      selectedRow: details
    })
  };

  clickHandler = () => {
    const { edit } = this.state;
    this.setState({
      edit: edit ? false : true
    })
  }

  handleRemoveDialogOpen = (index) => () => {
    console.log("Remove Handler");
  };
  render() {
    const { open, order, orderBy, page, edit, selectedRow } = this.state;
    const { match } = this.props;
    // console.log(match);

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


          <EditDialog
            openProp={edit}
            selectedRow={selectedRow}
            clickHandler={this.handleEditDialogOpen}
            handleCancel={this.clickHandler}
          />


        <Table
          id="id"
          data={trainees}
          columns={[
            {
              field: "name",
              label: "Name",
              align: "center"
            },
            {
              field: "email",
              label: "Email",
              format: value => value && value.toUpperCase()
            },
            {
              field: "createdAt",
              label: "Date",
              align: "right",
              format: this.getFormattedDate
            }
          ]}
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen
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

export default TraineeList;
