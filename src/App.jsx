import { Button, Input, Table } from "antd";
import { useState } from "react";

const App = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "5",
      name: "Niclas",
      age: 22,
      address: "10 Downing Street",
    },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        if (record.key === selectedRow?.key) {
          return (
            <Input
              onChange={(e) => {
                setSelectedRow({
                  ...selectedRow,
                  name: e.target.value,
                });
              }}
              value={selectedRow.name}
            />
          );
        }
        return record.name;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text, record, inex) => {
        if (record.key === selectedRow?.key) {
          return (
            <Input
              onChange={(e) => {
                setSelectedRow({
                  ...selectedRow,
                  age: e.target.value,
                });
              }}
              value={selectedRow.age}
            />
          );
        }
        return record.age;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record, index) => {
        if (record.key === selectedRow?.key) {
          return (
            <Input
              onChange={(e) => {
                setSelectedRow({
                  ...selectedRow,
                  address: e.target.value,
                });
              }}
              value={selectedRow.address}
            />
          );
        }
        return record.address;
      },
    },
    {
      title: "Action",
      render: (record) => {
        if (record.key === selectedRow?.key) {
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              <Button onClick={() => setSelectedRow(null)} danger>
                Cancel
              </Button>{" "}
              <Button
                onClick={() => {
                  setDataSource(
                    dataSource.map((value) => {
                      return record.key === value.key ? selectedRow : value;
                    })
                  );
                  return setSelectedRow(null);
                }}
              >
                Save
              </Button>
            </div>
          );
        }
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              onClick={() => {
                setDataSource(
                  dataSource.filter((value) => value.key !== record.key)
                );
              }}
              danger
            >
              Delete
            </Button>{" "}
            <Button onClick={() => setSelectedRow(record)}>Edit</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <Input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <Button
          onClick={() => {
            setDataSource([
              ...dataSource,
              {
                key: Math.random(),
                name,
                age,
                address,
              },
            ]);
            setName("");
            setAge("");
            setAddress("");
          }}
        >
          Add
        </Button>
      </div>
      <Table style={{ width: 600 }} dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default App;
