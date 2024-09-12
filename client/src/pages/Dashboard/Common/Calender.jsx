import { useState } from "react";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Import styles for the DateRangePicker
import "react-date-range/dist/theme/default.css"; // Import theme for the DateRangePicker
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";

const Calendar = () => {
  const [state, setState] = useState({
    selection1: {
      startDate: addDays(new Date(), -6),
      endDate: new Date(),
      key: "selection1",
    },
    selection2: {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 7),
      key: "selection2",
    },
  });

  return (
    <>
      <Breadcrumb pageName="Calendar" />

      {/* Calendar Section Start */}
      <div className="w-full max-w-full  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 md:p-6 lg:p-8">
        {/* DateRangePicker Section */}
        <div className="relative  overflow-x-auto">
          <div className="p-2 md:p-4 flex items-center justify-center bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <DateRangePicker
              onChange={(item) => setState({ ...state, ...item })}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={[state.selection1, state.selection2]}
              direction="horizontal"
              ariaLabels={{
                dateInput: {
                  selection1: {
                    startDate: "start date input of selection 1",
                    endDate: "end date input of selection 1",
                  },
                  selection2: {
                    startDate: "start date input of selection 2",
                    endDate: "end date input of selection 2",
                  },
                },
                monthPicker: "month picker",
                yearPicker: "year picker",
                prevButton: "previous month button",
                nextButton: "next month button",
              }}
              className="bg-blue-100 text-blue-600 hover:bg-blue-200"
            />
          </div>
        </div>
      </div>
      {/* Calendar Section End */}
    </>
  );
};

export default Calendar;
