import { useEffect } from "react";
import useClockContext from "../hooks/useClockContext";
import { forwardRef } from "react";

const TIME_ZONE_API_TOKEN = "arYdFcXtpzmrWEUjKmCp";
const GEOAPIFY_API_KEY = "3887c183775c4db9a1e429a659e3a4e5";

const Location = forwardRef(function Location(props, ref) {
  const { currentLocation, setCurrentLocation, isLoading, setIsLoading } =
    useClockContext();

  const { countryCode, city, state, stateCode, country } = currentLocation;

  async function getLocationDataFromTimeZoneAPI() {
    const ipDataResponse = await fetch("https://ipv6.jsonip.com/");
    const ipData = await ipDataResponse.json();
    const ipAddress = ipData.ip;

    const loactionDataResponse = await fetch(
      `https://timezoneapi.io/api/ip/?ip=${ipAddress}&token=${TIME_ZONE_API_TOKEN}`
    );
    const locationData = await loactionDataResponse.json();

    const results = locationData.data;

    const selectedData = {
      city: results.city,
      state: results.state,
      stateCode: results.state_code,
      country: results.country,
      countryCode: results.country,
      timeZoneName: results.datetime.offset_tzid,
      timeZoneAbb: results.datetime.offset_tzab,
      timeZoneFull: results.datetime.offset_tzfull,
    };

    setCurrentLocation((prevData) => {
      return { ...selectedData };
    });

    setIsLoading(false);
  }

  async function getLocationDataFromGeoapifyAPI(coordinates) {
    const locationDataResponse = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json&apiKey=${GEOAPIFY_API_KEY}`
    );
    const locationData = await locationDataResponse.json();

    const results = locationData.results[0];

    const selectedData = {
      city: results.city,
      state: results.state,
      stateCode: results.state_code,
      country: results.country,
      countryCode: results.country_code,
      timeZoneName: results.timezone.name,
      timeZoneAbb: results.timezone.abbreviation_DST,
    };
    setCurrentLocation((prevData) => {
      return { ...selectedData };
    });

    setIsLoading(false);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = position.coords;
          getLocationDataFromGeoapifyAPI(coordinates);
        },
        () => {
          getLocationDataFromTimeZoneAPI();
        }
      );
    } else {
      getLocationDataFromTimeZoneAPI();
    }
  }, []);

  return (
    <div className="text-lg relative" ref={ref}>
      {isLoading
        ? "Loading..."
        : `${country} ${city}, ${stateCode}, ${countryCode.toUpperCase()}`}
    </div>
  );
});

export default Location;
