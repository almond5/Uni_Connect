import React, { useEffect, useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleMapView from '../googleMapView';
import { useSession } from 'next-auth/react';

const EventsCreateView = (props: { rsos: any; unis: any }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState('PUBLIC');
  const [body, setBody] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lat, setLat] = useState(28.6024);
  const [lng, setLng] = useState(-81.2001);
  const [addr, setAddress] = useState(
    '4000 Central Florida Blvd, Orlando, FL 32816, USA'
  );
  const [uniSelected, setUni] = useState('');
  const [rsoSelected, setRso] = useState('');
  const { data: sesh } = useSession();
  const [userEmail, setUserEmail] = useState(sesh?.user!.email!);

  useEffect(() => {
    if (
      !(
        props.unis === undefined ||
        props.unis === null ||
        props.unis.length === 0
      )
    )
      setUni(props.unis[0].id);

    if (
      !(
        props.rsos === undefined ||
        props.rsos === null ||
        props.rsos.length === 0
      )
    )
      setRso(props.rsos[0].id);
  });

  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let value = event.target.value;
    setType(value);
  };

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
    phoneNumber: string | undefined | null;
    lat: number | undefined | null;
    lng: number | undefined | null;
    addr: string | undefined | null;
    uniSelected: string | undefined | null;
    rsoSelected: string | undefined | null;
    approved: string | undefined | null;
    userEmail: string | undefined | null;
  }) => {
    const response = await fetch('/api/eventCreate', {
      method: 'POST',
      body: JSON.stringify(event),
    });

    const { message, eventLoc, eventCheck, timeConflict } =
      await response.json();

    if (message === 'Conflicting Locations!') {
      alert(
        message +
          '\n' +
          eventCheck +
          "'s location conflicts with " +
          title +
          " 's location." +
          '\n' +
          eventLoc
      );
      return;
    } else if (message === 'Conflicting Times!') {
      alert(
        message +
          '\n' +
          eventCheck +
          "'s start time conflicts with " +
          title +
          " 's start time." +
          '\n' +
          timeConflict
      );
      return;
    } else if (message === 'You are not the admin of this RSO!') {
      alert(message + '\n');
      return;
    }

    window.location.reload();
    setBody('');
    setTitle('');
    setType('PUBLIC');
    setDate(null);
    setPhoneNumber('');
    setLat(28.6024);
    setLng(-81.2001);
    setAddress('');
    setUni('');
    setRso('');
    setUserEmail('');
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (date === null) setDate(new Date());
    const approved = 'TRUE';

    const event = {
      title,
      body,
      type,
      date,
      phoneNumber,
      lat,
      lng,
      addr,
      uniSelected,
      rsoSelected,
      approved,
      userEmail,
    };
    await submitEvent(event);
    await timeout(1000);
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
              Event Name:
            </div>
            <textarea
              maxLength={30}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              rows={1}
              cols={1}
              className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
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
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
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
                className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
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
              className="flex flex-col p-2 w-32 text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
            >
              <select
                name="type"
                required
                defaultValue="PUBLIC"
                onChange={selectChange}
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
                <option value="RSO_EVENT">RSO</option>
              </select>
            </div>
          </div>
          <div className={`${type === 'RSO_EVENT' ? 'mb-4' : 'hidden'}`}>
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
                defaultValue={rsoSelected}
                onChange={(e) => {
                  setRso(e.target.value);
                }}
              >
                {props.rsos === undefined ||
                props.rsos === null ||
                props.rsos.length === 0 ? (
                  <div></div>
                ) : (
                  props.rsos.map((rso: any) => (
                    <option key={rso.id} value={rso.id}>
                      {rso.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div className={`${type === 'PRIVATE' ? 'mb-4' : 'hidden'}`}>
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
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
                defaultValue={uniSelected}
                onChange={(e) => {
                  setUni(e.target.value);
                }}
              >
                {props.unis === undefined ||
                props.unis === null ||
                props.unis.length === 0 ? (
                  <div></div>
                ) : (
                  props.unis.map((university: any) => (
                    <option key={university.id} value={university.id}>
                      {university.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Phone #:
            </div>
            <input
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="number"
              className="block p-2 w-36 text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
              rounded-tl-none border-neutral-700"
              name="phone"
              maxLength={11}
            />
          </div>

          <div className="mb-4 text-lg">
            <div
              className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
            >
              Address:
            </div>
            <div>
              <textarea
                maxLength={322}
                value={addr}
                disabled
                rows={1}
                cols={1}
                className="block p-2 w-full text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div
                className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
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
                className="block p-2 w-max text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>

            <div>
              <div
                className="rounded-[0.175rem] w-max border-l-[0.175rem] border-t-[0.175rem] border-r-[0.175rem] 
                border-neutral-700 px-2 font-bold transition bg-neutral-300 text-lg"
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
                className="block p-2  w-max text-md text-gray-900 bg-neutral-50 rounded-lg border-[0.175rem] 
                rounded-tl-none border-neutral-700"
              ></textarea>{' '}
            </div>
          </div>

          <GoogleMapView
            setLat={setLat}
            setLng={setLng}
            setAddress={setAddress}
          ></GoogleMapView>
        </div>

        <div className="py-[32px]">
          <div
            className={`${
              (type === 'PRIVATE' &&
                (props.unis === null ||
                  props.unis === undefined ||
                  props.unis.length === 0)) ||
              (type === 'RSO_EVENT' &&
                (props.rsos === null ||
                  props.rsos === undefined ||
                  props.rsos.length === 0))
                ? ''
                : 'hidden'
            }`}
          >
            <div
              className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
             bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
            >
              Submit
            </div>
          </div>

          <div
            className={`${
              !(
                type === 'PRIVATE' &&
                (props.unis === null ||
                  props.unis === undefined ||
                  props.unis.length === 0)
              ) &&
              !(
                type === 'RSO_EVENT' &&
                (props.rsos === null ||
                  props.rsos === undefined ||
                  props.rsos.length === 0)
              )
                ? ''
                : 'hidden'
            }`}
          >
            <button>
              <div
                className="mx-auto rounded-[0.5rem] w-max border-[0.175rem] border-neutral-700 px-3 py-1 font-bold transition
             bg-neutral-50 text-lg hover:bg-neutral-400 hover:text-gray-800"
              >
                Submit
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventsCreateView;
