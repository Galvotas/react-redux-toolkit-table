import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsers,
  fetchUserById,
  saveItem,
  removeItem,
} from "../redux/reducers/usersSlice";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Container,
  IconButton,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

const tableHeadValues = ["ID", "NAME", "USERNAME", "EMAIL", "PHONE", "ACTION"];

export const UsersTable = () => {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [activeEditItem, setActiveEditItem] = useState({});

  useEffect(() => {
    dispatch(fetchUserById());
  }, []);

  console.log(users);
  console.log(activeEditItem);

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeadValues.map((val, i) => (
                <TableCell key={i} align={val === "ACTION" ? "center" : "left"}>
                  {val}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map(({ id, name, username, email, phone }, i) => {
                return (
                  <TableRow key={i}>
                    {activeEditItem.id !== id ? (
                      <>
                        <TableCell>{id}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{username}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{phone}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{id}</TableCell>

                        <TableCell>
                          <TextField
                            onChange={(e) =>
                              setActiveEditItem({
                                ...activeEditItem,
                                name: e.target.value,
                              })
                            }
                            id="standard-basic"
                            value={activeEditItem.name}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            onChange={(e) =>
                              setActiveEditItem({
                                ...activeEditItem,
                                username: e.target.value,
                              })
                            }
                            id="standard-basic"
                            value={activeEditItem.username}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            onChange={(e) =>
                              setActiveEditItem({
                                ...activeEditItem,
                                email: e.target.value,
                              })
                            }
                            id="standard-basic"
                            value={activeEditItem.email}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            onChange={(e) =>
                              setActiveEditItem({
                                ...activeEditItem,
                                phone: e.target.value,
                              })
                            }
                            id="standard-basic"
                            value={activeEditItem.phone}
                          />
                        </TableCell>
                      </>
                    )}
                    <TableCell align="center">
                      {activeEditItem.id === id ? (
                        <IconButton
                          onClick={() => {
                            dispatch(saveItem(activeEditItem));
                            setActiveEditItem({});
                          }}
                        >
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() =>
                            setActiveEditItem({
                              id,
                              name,
                              username,
                              email,
                              phone,
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => dispatch(removeItem(id))}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
