import React from "react";
import api from "../../utils/api";
import StyledAsyncSelect from "../select/StyledAsyncSelect";
import { ReactSelectOption } from "../../utils/types";

interface SourceSuggestion {
  _key: string;
  ref: string;
  title: string;
}

interface ReactSelectInputValue {
  inputValue: string;
}

const promiseAutocomplete = async (inputValue: string) => {
  // No need to query the server too fast
  if (!inputValue || inputValue.length <= 1) return;
  // Query our beautiful API
  const response = await api.get("/sources/autocomplete", {
    params: { search: inputValue }
  });
  if (response.status === 200) {
    // Convert the API data to react-select format.
    const suggestions: Array<ReactSelectOption> = [];
    const data = response.data as Array<SourceSuggestion>;
    for (var i = 0; i < data.length; i += 1) {
      suggestions.push({
        value: data[i]._key,
        label: data[i].ref,
        title: data[i].title
      });
    }
    return suggestions;
  } else {
    console.error("Error requesting suggestions: " + response.status);
    console.error(response);
    return [];
  }
};

export interface Props {
  onChange?: (value: ReactSelectOption) => void;
  onInputChange?: (value: string) => void;
  inputValue?: string;
  onCreateRef: (value: string) => void;
}

// object is the state type
class SourceRefSearch extends React.Component<Props, object> {
  onChange = (object: any) => {
    if (this.props.onChange) this.props.onChange(object);
  };

  onInputChange = (text: any, a: any) => {
    const action: string = a.action;
    if (action === "menu-close" || action === "input-blur") return;
    else if (this.props.onInputChange) {
      this.props.onInputChange(text);
    }
  };

  render() {
    return (
      <StyledAsyncSelect
        cacheOptions
        defaultOptions
        classNamePrefix="rs"
        onChange={this.onChange}
        onInputChange={this.onInputChange}
        inputValue={
          this.props.onInputChange ? this.props.inputValue : undefined
        }
        autoFocus
        allowCreateWhileLoading
        onCreateOption={this.props.onCreateRef}
        noOptionsMessage={(d: ReactSelectInputValue) => {
          return d.inputValue && d.inputValue.length > 1
            ? "Nothing found"
            : null;
        }}
        placeholder="..."
        loadOptions={promiseAutocomplete}
      />
    );
  }
}

export default SourceRefSearch;