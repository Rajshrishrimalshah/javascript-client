/* eslint-disable no-unused-vars */
import ApolloClient from "apollo-boost";
import AddDialog from "../Trainee/components/AddDialog/AddDialog";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveDialog from "./components/RemoveDialog/RemoveDialog";
import EditIcon from "@material-ui/icons/Edit";
import EditDialog from "./components/EditDialog/EditDialog";
import Form from "../Trainee/Form";
import moment from "moment";
import { Mutation } from "react-apollo";
import LocalStorageMethods from "../../contexts/snackBarProvider/LocalStorageMethods";
import { Query, withApollo } from "react-apollo";
import { gql } from "apollo-boost";
import trainees from "./data/trainee";
import Table from "../Table/Table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withSnackBarConsumer } from "../../contexts/snackBarProvider/withSnackBarConsumer";
import { callApi } from "../../lib/utils/api";
import * as dotenv from "dotenv";

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
      currentUser: {},
      loader: true,
      data: [],
      loading: true,
      skip: 280,
      limit: 10
    };
  }

  reloadTable = async () => {
    const { snackBarOpen } = this.props;
    const { loader, data, loading, skip, limit } = this.state;

    try {
      const res = await callApi({
        url: `${process.env.REACT_APP_BASE_URL}${
          process.env.REACT_APP_FETCH_DETAIL
        }`,
        params: { skip, limit },
        method: "get"
      });
      console.log("success", res.data.data.records);
      this.setState({
        loading: false,
        data: res.data.data.records
      });
    } catch (error) {
      const err = error.response.data.message;
      snackBarOpen(err, "error");
      console.log(err);
      this.setState({
        loading: false
      });
    }
  };

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

  handleEditDialogueOpen = obj => {
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

    this.reloadTable();
    // const check = moment(obj.createdAt).isAfter("2019-02-14");

    // check
    //   ? snackBarOpen("This is a success message !", "success")
    //   : snackBarOpen("This is an error message !", "error");
  };

  handleDataParent = (name, email, password) => async event => {
    console.log("ADDED TRAINEE HANDLER");
    const CREATE_TRAINEE1 = gql`
      mutation createTrainee($name: String, $email: String, $password: String) {
        createTrainee(name: $name, email: $email, password: $password) {
          message
        }
      }
    `;
    const { user, open } = this.state;
    const { snackBarOpen, getItem, client } = this.props;
    user["name"] = name;
    user["email"] = email;
    user["password"] = password;
    const { data } = await client.mutate({
      mutation: CREATE_TRAINEE1,
      variables: { name, email, password }
    });
    console.log("Data: ", data);
    snackBarOpen(data.createTrainee.message, "success");
    this.setState({
      open: open ? false : true
    });

    // Add new trainee using Axios
    // try {
    //   const res = await callApi({
    //     url: process.env.REACT_APP_BASE_URL + process.env.REACT_APP_TRAINEE,
    //     method: "post",
    //     data: {
    //       name,
    //       email,
    //       password
    //     }
    //   });
    //   snackBarOpen(res.data.message, "success");
    //   console.log("success", res);
    // } catch (error) {
    //   const err = error.response.data.message;
    //   snackBarOpen(err, "error");
    // }
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

  handleChangePage = async (event, newPage) => {
    console.log("newPage value ==>", newPage);
    const { snackBarOpen } = this.props;
    const {
      loader,
      data,
      loading,
      skip,
      limit,
      orderBy,
      order,
      page
    } = this.state;

    this.setState({
      page: newPage,
      skip: limit * newPage,

      loading: true
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
      currentUser,
      loading,
      data,
      skip,
      limit
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
            reloadTable={this.reloadTable}
          />
        )}
        <RemoveDialog
          open={openDeleteDialog}
          onClose={this.handleClose}
          data={currentUser}
          onSubmit={this.onDeleteSubmit}
          reloadTable={this.reloadTable}
        />

        <Query
          query={gql`
            query getTraineeDetail($limit: Int, $skip: Int) {
              getTraineeDetail(limit: $limit, skip: $skip) {
                _id
                name
                email
                role
                originalId
              }
            }
          `}
          variables={{ limit, skip }}
        >
          {({ loading, error, data }) => {
            return (
              <Table
                loading={loading}
                id="id"
                data={data.getTraineeDetail || []}
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
                count={400}
                page={page}
                onChangePage={this.handleChangePage}
              />
            );
          }}
        </Query>
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

export default withApollo(
  LocalStorageMethods(withSnackBarConsumer(TraineeList))
);
