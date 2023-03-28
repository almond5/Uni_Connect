import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const EventsCreateView = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState('PUBLIC');
  const [body, setBody] = useState('');

  const fontFamily = 'system-ui';
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontFamily,
          },
        },
      },
    },
  });

  const submitEvent = async (event: {
    title: string | undefined | null;
    body: string | undefined | null;
    type: string | undefined | null;
    date: Date | undefined | null;
  }) => {
    const response = await fetch('/api/eventCreate', {
      method: 'POST',
      body: JSON.stringify(event),
    });

    const data = await response.json();
    console.log(data);
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    setType(value)

    return (<div>{value}</div>);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const event = { title, body, type, date };
    await submitEvent(event);
    await timeout(1000);
    window.location.reload();
    setBody('');
    setTitle('');
    setType('PUBLIC');
    setDate(null);
  };

  return (
    <div className="flex-col text-center py-24">
      <form onSubmit={handleSubmit}>
        <div
          className="mx-auto max-w-md text-xl text-left xs:max-w-md sm:max-w-md 
        md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md"
        >
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Title:
            </div>
            <textarea
              maxLength={30}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              rows={1}
              cols={1}
              className="block p-2.5 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700 "
            ></textarea>{' '}
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Date:
            </div>
            <div
              className="block w-full text-sm text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
            >
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="w-full"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Description:
            </div>
            <div>
              <textarea
                maxLength={30}
                value={body}
                onChange={(e) => [setBody(e.target.value)]}
                required
                rows={7}
                cols={1}
                className="block p-2.5 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Event Type:
            </div>
            <div
              className="flex flex-col p-2.5 w-28 text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
            >
              <select
                name="type"
                required
                defaultValue="PUBLIC"
                onChange={selectChange}
              >
                <option
                  value="PUBLIC"
                >
                  Public
                </option>
                <option
                  value="PRIVATE"
                >
                  Private
                </option>
                <option value="RSO">
                  RSO
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="py-[32px]">
          <button>
            <div
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
             bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
            >
              Submit
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventsCreateView;
