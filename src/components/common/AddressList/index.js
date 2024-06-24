import "./index.scss";
import React from "react";
import addressMarker from "assets/images/address-marker.jpg";
import { FormattedMessage } from "react-intl";
import { useDialog } from "hooks/common";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { TextField } from "../../forms";
import { useSnackbar } from "notistack";

const AddressList = ({ items }) => {
  const { open } = useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const renderAddress = (item) => {
    return [
      item.area,
      item.block,
      item.building,
      item.apartment,
      item.additionalInfo,
      item.avenue,
    ]
      .filter((field) => !!field)
      .join(", ");
  };

  const renderItem = (item, index) => {
    const coord = [item.latitude, item.longitude];

    function ChangeMapView({ coords }) {
      const map = useMap();
      map.setView(coords, map.getZoom());
      return null;
    }

    const handleOpenModal = () => {
      if (item.longitude || item.latitude) {
        open(modalMap, null, { title: `Address info` });
      }
    };

    const handleClick = () => {
      navigator.clipboard.writeText(
        ` https://maps.google.com/?q=${coord[0]},${coord[1]}`
      );
      enqueueSnackbar("Copied to clipboard");
    };

    const modalMap = () => (
      <div className={"medications-page__modal"}>
        <MapContainer
          style={{ height: "50vh" }}
          center={coord}
          zoom={12}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ChangeMapView coords={coord} />
          <Marker
            position={coord}
            icon={
              new L.Icon({
                iconUrl: markerIcon,
                iconSize: [25, 40],
              })
            }
          />
        </MapContainer>
        <br />
        <TextField
          onClickCapture={handleClick}
          value={`https://maps.google.com/?q=${coord[0]},${coord[1]}`}
        />
      </div>
    );

    return (
      <li className={"address-list__item"} key={index}>
        <img
          className={"address-list__icon"}
          onClick={() => handleOpenModal(item)}
          src={addressMarker}
          alt="avatar"
        />
        <span className={"address-list__text"}>{renderAddress(item)}</span>
        {item.isPrimary && (
          <span className={"address-list__is_primary"}>
            ({<FormattedMessage id={"words.common.primary"} />})
          </span>
        )}
      </li>
    );
  };

  if (!Array.isArray(items)) return null;

  return <ul className={"address-list"}>{items.map(renderItem)}</ul>;
};

export default AddressList;
