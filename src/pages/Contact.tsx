import React, { useState, useEffect, useRef } from "react";
import LandingPage from "../Components/LandingPage";
import _ from "lodash";
import { Button, Divider, Form, Input, Space, Row, Col } from "antd";
import { FormInstance } from "antd/lib/form";

interface data {
  id: number;
  firstName: string;
  secondName: string;
}

function Contact() {
  const [enableCreateContact, setEnableCreateContact] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [addContactList, setAddContactList] = useState<data[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const formRef = useRef<FormInstance>(null);

  // get the stored items from localstorage and display
  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setAddContactList(JSON.parse(storedList));
    }
  }, []);


// set the data added in the local storage in the name called list
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(addContactList));
  }, [addContactList]);

  
  const createContact = () => {
    setEnableCreateContact(true);
  };

  // onChange on first name
  const changefirstName = (e: any) => {
    setFirstName(e.target.value);
  };

  // onChange on last name
  const changeSecondName = (e: any) => {
    setSecondName(e.target.value);
  };

  // adding the contact 
  const addContact = (event: any) => {
    console.log("sdad", event);
    event.preventDefault();
    // assigning to the variable called newData to get as on object
    const newData: data = {
      id: Date.now(),
      firstName,
      secondName,
    };
    setAddContactList([...addContactList, newData]);
    setFirstName("");
    setSecondName("");
    formRef.current?.resetFields();
    setEnableCreateContact(false);
  };

// sorting the added contact in the ascending order
  const storedList = addContactList.sort((a, b) => b.id - a.id);

  // delete contact by click the delete on particular id
  const deleteContact = (id: number) => {
    // based on the particular id filters and update
    const updateList = addContactList.filter((list) => list.id !== id);
    setAddContactList(updateList);
  };

  // edit the added contact 
  const onEdit = (id: number) => {
    // once onclick the form page is made true
    setEnableCreateContact(true);
    // the input enabled to edit
    setIsOnEdit(true);
    console.log(
      "yeuw",
      storedList.find((d: any) => d.id === id)
    );
    // based on the particular data filtering the id
    const filteredData = storedList.find((d: any) => d.id === id);
    setFirstName(filteredData?.firstName || "");
    setSecondName(filteredData?.secondName || "");
    setSelectedId(filteredData?.id as number | undefined);
  };

  const updateContact = (event: any) => {
    event.preventDefault();

    // Find the index of the item to be updated in the storedList array
    const itemIndex = storedList.findIndex(
      (item: any) => item.id === selectedId
    );

    if (itemIndex !== -1) {
      // Create a copy of the storedList array
      const updatedList = [...storedList];

      // Update the values of the item
      updatedList[itemIndex].firstName = firstName;
      updatedList[itemIndex].secondName = secondName;

      // Update the state with the updated list

      // Update the local storage with the updated list
      localStorage.setItem("list", JSON.stringify(updatedList));
      setEnableCreateContact(false);
    }
  };

  return (
    <LandingPage>
      {!enableCreateContact ? (
        <div className="Landing-Page">
          {addContactList.length > 0 ? (
            <div>
              <div className="Create-One">
                <Button className="Button-Color" onClick={createContact}>
                  Create Contact
                </Button>
              </div>

              {storedList.map((d) => {
                return (
                  <>
                    <span className="Data-display" key={d.id}>
                      Fist Name: {d.firstName} , Second Name: {d.secondName}
                    </span>
                    <div className="Update-Buttons">
                      <Button danger onClick={() => deleteContact(d.id)}>
                        Delete
                      </Button>{" "}
                      <Space />
                      <Button type="primary" onClick={() => onEdit(d.id)}>
                        Edit
                      </Button>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <span>
              <Button className="Button-Color" onClick={createContact}>
                Create Contact
              </Button>
              <Divider />
              <div className="Box-content">
                No contact found.Please add contact from create contact button
              </div>
            </span>
          )}
        </div>
      ) : (
        <div className="Form-Data">
          <Row>
            <Col span={8} offset={8}>
              <h3> Create a new contact</h3>
              <Form
                name="basic"
                ref={formRef}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}>
                  <Input
                    onChange={changefirstName}
                    value={firstName}
                    defaultValue={firstName}
                  />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastname"
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}>
                  <Input
                    onChange={changeSecondName}
                    value={secondName}
                    defaultValue={secondName}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  {isOnEdit ? (
                    <Button type="primary" onClick={updateContact}>
                      Update
                    </Button>
                  ) : (
                    <Button type="primary" onClick={addContact}>
                      Submit
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </LandingPage>
  );
}

export default Contact;
