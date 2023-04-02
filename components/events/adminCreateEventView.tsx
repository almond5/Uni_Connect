import React, { useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleMapView from '../googleMapView';

const AdminEventsCreateView = (props: { unis: any; rsos: any }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState('PUBLIC');
  const [body, setBody] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [lat, setLat] = useState(28.6024);
  const [lng, setLng] = useState(-81.2001);
  const [locationName, setLocatioName] = useState('');
  const [uniSelected, setUni] = useState('');
  const [rsoSelected, setRso] = useState('');

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
    phoneNumber: number | undefined | null;
    lat: number | undefined | null;
    lng: number | undefined | null;
    locationName: string | undefined | null;
    uniSelected: string | undefined | null;
    rsoSelected: string | undefined | null;
  }) => {
    const response = await fetch('/api/eventCreate', {
      method: 'POST',
      body: JSON.stringify(event),
    });

    const data = await response.json();
    console.log(data);
  };

  const submitApproval = async (event: {
    title: string | undefined | null;
    body: string | undefined | null;
    type: string | undefined | null;
    date: Date | undefined | null;
    phoneNumber: number | undefined | null;
    lat: number | undefined | null;
    lng: number | undefined | null;
    locationName: string | undefined | null;
    uniSelected: string | undefined | null;
    rsoSelected: string | undefined | null;
  }) => {
    const response = await fetch('/api/eventApprovalForm', {
      method: 'POST',
      body: JSON.stringify(event),
    });

    const data = await response.json();
    console.log(data);
  };

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const selectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    setType(value);
  };

  const selectRSO = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    setRso(value);
  };

  const selectUni = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    setUni(value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (date === null) setDate(new Date());

    if (type === 'PUBLIC') {
      const event = {
        title,
        body,
        type,
        date,
        phoneNumber,
        lat,
        lng,
        locationName,
        uniSelected,
        rsoSelected
      };
      await submitApproval(event);
      await timeout(1000);
      window.location.reload();
    } else {
      const event = {
        title,
        body,
        type,
        date,
        phoneNumber,
        lat,
        lng,
        locationName,
        uniSelected,
        rsoSelected
      };
      await submitEvent(event);
      await timeout(1000);
    }

    setBody('');
    setTitle('');
    setType('PUBLIC');
    setDate(null);
    setPhoneNumber(0);
    setLat(28.6024);
    setLng(-81.2001);
    setLocatioName('');
  };
  console.log(props.unis);

  return (
    <div className="flex-col text-center py-24">
      <form onSubmit={handleSubmit}>
        <div
          className="mx-auto max-w-md text-xl text-left xs:max-w-md sm:max-w-md 
        md:max-w-md lg:max-w-md xl:max-w-md 2xl:max-w-md"
        >
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] 
              border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition 
                bg-neutral-300 text-lg"
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
              className="block p-2 w-full text-md text-gray-900 
              bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700 "
            ></textarea>{' '}
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] 
              border-r-[0.175rem] 
              border-neutral-700 px-2 font-bold transition 
              bg-neutral-300 text-lg"
            >
              Date:
            </div>
            <div
              className="block w-full text-sm text-gray-900 
              bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
            >
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
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
              className="rounded-[0.175rem] w-max border-l-[0.175rem] 
              border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition 
                bg-neutral-300 text-lg"
            >
              Description:
            </div>
            <div>
              <textarea
                maxLength={322}
                value={body}
                onChange={(e) => [setBody(e.target.value)]}
                required
                rows={7}
                cols={1}
                className="block p-2 w-full text-md text-gray-900 
                bg-neutral-50 rounded-lg border-[0.175rem] 
                  rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>
          </div>

          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] 
              border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Event Type:
            </div>
            <div
              className="flex flex-col p-2 w-32 text-md text-gray-900 
              bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
            >
              <select
                name="type"
                required
                defaultValue="PUBLIC"
                onChange={selectType}
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
                <option value="RSO">RSO</option>
              </select>
            </div>
          </div>

          <div className={`${type === 'RSO' ? 'mb-4' : 'hidden'}`}>
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] 
                border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition 
                bg-neutral-300 text-lg"
            >
              Select RSO
            </div>
            <div
              className="flex flex-col p-2 w-32 text-md text-gray-900 
              bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
            >
              <select
                name="rsoDropDown"
                defaultValue="N/A"
                onChange={selectRSO}
              >
                {props.rsos.map((rso: any) => (
                  <option key={rso.id} value={rso.id}>{rso.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={`${
              type === 'PRIVATE' || type === 'RSO' ? 'mb-4' : 'hidden'
            }`}
          >
            <div className="mb-4 text-lg">
              <div
                className="rounded-[0.175rem] w-max border-l-[0.175rem] 
              border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition 
                bg-neutral-300 text-lg"
              >
                University:
              </div>
              <div
                className="flex flex-col p-2 w-32 text-md text-gray-900 
              bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              >
                <select
                  name="University"
                  defaultValue="N/A"
                  onChange={selectUni}
                >
                  {props.unis.map((university: any) => (
                    <option key={university.id} value={university.id}>{university.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] 
              border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition 
                bg-neutral-300 text-lg"
            >
              Phone #:
            </div>
            <input
              required
              onChange={(e) => setPhoneNumber(Number(e.target.value))}
              type="number"
              className="block p-2 w-36 text-md text-gray-900 
              bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700"
              name="phone"
              maxLength={11}
            />
          </div>
          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem]
               border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition 
                bg-neutral-300 text-lg"
            >
              Location Name:
            </div>
            <input
              required
              onChange={(e) => setLocatioName(e.target.value)}
              type="text"
              className="block p-2 w-full text-md text-gray-900 
              bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700"
              name="location"
              maxLength={50}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <div
                className="rounded-[0.175rem] w-max border-l-[0.175rem]
                 border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition 
                bg-neutral-300 text-lg"
              >
                Latitude:
              </div>
              <textarea
                maxLength={32}
                style={{ overflow: 'hidden' }}
                value={lat}
                disabled
                rows={1}
                cols={18}
                className="block p-2 w-max text-md text-gray-900 
                bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>

            <div>
              <div
                className="rounded-[0.175rem] w-max border-l-[0.175rem] 
                border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition 
                bg-neutral-300 text-lg"
              >
                Longitude:
              </div>
              <textarea
                maxLength={0}
                style={{ overflow: 'hidden' }}
                value={lng}
                disabled
                rows={1}
                cols={18}
                className="block p-2  w-max text-md text-gray-900 
                bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>
          </div>

          <GoogleMapView setLat={setLat} setLng={setLng}></GoogleMapView>
        </div>

        <div className="py-[32px]">
          <button>
            <div
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] 
              border-neutral-700 px-3 py-1 font-bold transition
             bg-neutral-50 text-lg hover:bg-neutral-400 
             hover:text-gray-800"
            >
              Submit
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEventsCreateView;
