import React from "react";
import { Tabs, Switch, Select, Input, Button } from "antd";
import {
  BulbOutlined,
  GlobalOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "./Settings.css";

const { TabPane } = Tabs;
const { TextArea } = Input;

const Settings = ({
  currentTheme,
  currentLanguage,
  onThemeChange,
  onLanguageChange,
}) => {
  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    const suggestion = e.target.suggestion.value;
    alert(`Suggestion submitted: ${suggestion}`);
    e.target.reset();
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      <Tabs defaultActiveKey="1" className="settings-tabs">
        <TabPane
          tab={
            <span className="tab-icon">
              <BulbOutlined /> Theme
            </span>
          }
          key="1"
        >
          <div className="tab-content-card">
            <p className="tab-description">
              Toggle between Light and Dark themes:
            </p>
            <Switch
              checked={currentTheme === "dark"}
              onChange={(checked) => onThemeChange(checked ? "dark" : "light")}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span className="tab-icon">
              <GlobalOutlined /> Language
            </span>
          }
          key="2"
        >
          <div className="tab-content-card">
            <p className="tab-description">Select your preferred language:</p>
            <Select
              value={currentLanguage}
              onChange={onLanguageChange}
              style={{ width: 200 }}
            >
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="Portuguese">Portuguese</Select.Option>
              <Select.Option value="Spanish">Spanish</Select.Option>
            </Select>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span className="tab-icon">
              <MessageOutlined /> Send Suggestion
            </span>
          }
          key="3"
        >
          <div className="tab-content-card">
            <form onSubmit={handleSuggestionSubmit} className="message-box">
              <p className="tab-description">Share your suggestions with us:</p>
              <TextArea
                name="suggestion"
                rows={4}
                placeholder="Enter your suggestion here"
                required
              />
              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
              >
                Submit
              </Button>
            </form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Settings;
