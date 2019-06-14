import AddDialog from "../Trainee/components/AddDialog/AddDialog";
import Button from "@material-ui/core/Button";
import Form from "../Trainee/Form";
import trainees from "./data/trainee";
import Table from "../Table/Table";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy:"",
      order:"asc",
      user: {
        name: "",
        email: "",
        password: ""
      },


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
      open: open ? false : true,
    });

    console.log(this.state.user);
  };

  getFormattedDate = (date) => {
    return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
  }

  handleSort = (event, property) => {
    const { order, orderBy } = this.state;
    const isDesc = orderBy === property && order === 'desc';
    console.log(this.state)
    this.setState({
      order: isDesc ? 'asc' : 'desc',
      orderBy: property
    })
  }

  render() {
    const { open, order, orderBy } = this.state;
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
              format: value => value && value.toUpperCase(),
            },
            {
              field: "createdAt",
              label: "Date",
              align: "right",
              format: this.getFormattedDate,
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}

        />

        <ul>
          {trainees.map(({ id, name }) => (
            <li key={id}>
              <Link to={`${match.url}/${id}`}> {name} </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default TraineeList;
