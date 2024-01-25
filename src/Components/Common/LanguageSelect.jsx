import React, { useContext } from "react";
import { StoreContext } from "../../Context/Store";
import { Form, Select } from "antd";

const LanguageSelect = ({ children, label, onChange, defaultValue }) => {
    const { languages } = useContext(StoreContext);

    function getOptions() {
        return languages?.map((lang) => {
            return {
                value: lang,
                label: lang[0].toUpperCase() + lang.substr(1),
            };
        });
    }

    return (
        <Form.Item label={label}>
            <Select
                onChange={onChange}
                defaultValue={defaultValue}
                style={{ width: 120 }}
                options={getOptions()}
            />
            {children}
        </Form.Item>
    );
};

export default LanguageSelect;
