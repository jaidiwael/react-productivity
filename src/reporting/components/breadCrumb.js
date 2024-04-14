import { Fragment } from "react";

const BreadCrumb = ({ items }) => {
  return (
    <div className="inline-flex align-items-center">
      {items?.map((item, index) => {
        return (
          <Fragment key={index}>
            <div
              onClick={() => item.action(item?.id)}
              className="cursor-pointer"
            >
              {item.label}
            </div>
            {index < items.length - 1 && <span className="pi pi-angle-right" />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
