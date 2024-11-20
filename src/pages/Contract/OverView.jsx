import { createRoot } from "react-dom/client";
import "./index.css";
import * as React from "react";
import { useEffect } from "react";
import { extend, addClass } from "@syncfusion/ej2-base";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

const Overview = ({ kanbanData, submit }) => {
  let data = extend([], kanbanData, null, true);

  const fields = [
    { text: "ID", key: "Title", type: "TextBox" },
    { key: "Status", type: "DropDown" },
    { key: "Assignee", type: "DropDown" },
    { key: "RankId", type: "TextBox" },
    { key: "Summary", type: "TextArea" },
  ];
  const cardRendered = (args) => {
    let val = args.data.Priority;
    addClass([args.element], val);
  };
  const columnTemplate = (props) => {
    return (
      <div className="header-template-wrap">
        <div className={"header-icon e-icons " + props.keyField}></div>
        <div className="header-text">{props.headerText}</div>
      </div>
    );
  };
  const cardTemplate = (props) => {
    return (
      <div className={"card-template"}>
        <div className="e-card-header">
          <div className="e-card-header-caption">
            <div className="e-card-header-title e-tooltip-text">
              {props.Title}
            </div>
          </div>
        </div>
        <div className="e-card-content e-tooltip-text">
          <div className="e-text">{props.Summary}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const element = document.querySelector("body > div:nth-child(3)");
    element && element.remove();
  }, []);

  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <KanbanComponent
            id="kanban"
            cssClass="kanban-overview"
            keyField="Status"
            dataSource={data}
            enableTooltip={true}
            swimlaneSettings={{ keyField: "Assignee" }}
            cardSettings={{
              headerField: "Title",
              template: cardTemplate.bind(this),
              selectionType: "Multiple",
            }}
            dialogSettings={{ fields: fields }}
            cardRendered={cardRendered.bind(this)}
            dataSourceChanged={(e) => submit(e.changedRecords[0])}
          >
            <ColumnsDirective>
              <ColumnDirective
                headerText="To Do"
                keyField="Open"
                allowToggle={true}
                template={columnTemplate.bind(this)}
              />
              <ColumnDirective
                headerText="In Progress"
                keyField="InProgress"
                allowToggle={true}
                template={columnTemplate.bind(this)}
              />
              <ColumnDirective
                headerText="In Review"
                keyField="Review"
                allowToggle={true}
                template={columnTemplate.bind(this)}
              />
              <ColumnDirective
                headerText="Done"
                keyField="Close"
                allowToggle={true}
                template={columnTemplate.bind(this)}
              />
            </ColumnsDirective>
          </KanbanComponent>
        </div>
      </div>
    </div>
  );
};
export default Overview;
