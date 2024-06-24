import "./index.scss";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Drawer, Tooltip } from "@material-ui/core";
import {
  PhoneOutlined,
  ArrowDropDown,
  ExitToApp,
  Notifications,
  QueryBuilder,
} from "@material-ui/icons";
import { FormattedMessage } from "react-intl";
import {
  Logo,
  Popover,
  ProfileDropdown,
  LangSwitcher,
} from "components/common";
import { NotificationsBar } from "components/layout";
import { resolveHomepageByRole } from "utils/roles";
import { useNotificationsBar } from "hooks/common";
import { useDoctorAPI } from "hooks/doctors";
import { useUser } from "hooks/user";

import pharmacistConfig from "config/pharmacist";
import noAvatar from "assets/images/no-avatar.svg";
import sleep from "assets/images/sleep.svg";

import headerLinks from "./headerLinks";
import { useSnackbar } from "notistack";
import { datadogRum } from "@datadog/browser-rum";

const Header = ({ role, name, status, onLogout, avatar }) => {
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const { open, close, isOpen } = useNotificationsBar();
  const { updateStatus } = useDoctorAPI();
  const { enqueueSnackbar } = useSnackbar();
  const { permissions } = useUser();

  const handleOpenPopover = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
  };

  datadogRum.setUser({
    name: name,
    role: role,
    id: datadogRum.getInternalContext().session_id,
  });

  const handleDoctorStatusUpdate = () => {
    updateStatus(status.val === "Offline" ? "Online" : "Offline").then(
      (response) => {
        if (response.success) {
          enqueueSnackbar(`Status changed to ${response.status}`);
        } else {
          enqueueSnackbar(`Something went wrong`);
        }
      }
    );
  };

  const getTranslatedNavigationId = (title) =>
    `header.navigation.${title.split(" ").join("-").toLowerCase()}`;

  const renderNavigationByRole = (role, permissions) => {
    const isAdmin = role === "super admin" ? "admin" : role;
    const links = headerLinks[isAdmin] || [];

    const requiredPermissions = [
      { link: "Ads", permissions: ["view_ad", "add_ad", "change_ad"] },
    ];

    function hasRequiredPermissions(permissions, requiredPermissions) {
      return permissions.some((permission) =>
        requiredPermissions.some((required) =>
          required.permissions.includes(permission.codename)
        )
      );
    }

    const hasPermissions = hasRequiredPermissions(
      permissions,
      requiredPermissions
    );

    const renderLink = (link) => (
      <NavLink
        key={link.path}
        className={"header__link"}
        activeClassName={"header__link--active"}
        to={link.path}
      >
        <FormattedMessage
          id={getTranslatedNavigationId(link.title)}
          defaultMessage={link.title}
        />
      </NavLink>
    );

    if (role === "super admin" || hasPermissions) {
      return links.map(renderLink);
    } else if (role === "admin" || permissions.length === 0) {
      const filteredLinks = links.filter((link) => link.title !== "Ads");
      return filteredLinks.map(renderLink);
    }
  };

  const renderCallCenterBlock = () => {
    return (
      <div className={"header__call call"}>
        <PhoneOutlined fontSize={"large"} className={"call__icon"} />
        <div className={"call__content"}>
          <span className={"call__title"}>Call center</span>
          <span className={"call__number"}>
            {pharmacistConfig.callCenterPhoneNumber}
          </span>
        </div>
      </div>
    );
  };

  const renderNotificationsBlock = () => {
    return (
      <div className={"header__notifications notifications"}>
        <Notifications
          className={"notifications__icon"}
          onClick={() => open()}
        />
        <Drawer anchor="right" onClose={close} open={isOpen}>
          <NotificationsBar />
        </Drawer>
      </div>
    );
  };

  const renderProfilePreview = () => {
    return (
      <>
        <div className={"header__profile profile"} onClick={handleOpenPopover}>
          <img
            className={"profile__avatar"}
            src={avatar || noAvatar}
            alt="avatar"
          />
          <div className={"profile__content"}>
            <span className={"profile__name"}>{name}</span>
            <span className={"profile__role"}>{role}</span>
          </div>
          <ArrowDropDown className={"profile__icon"} />
        </div>
        <Popover
          open={Boolean(popoverAnchor)}
          anchor={popoverAnchor}
          onClose={handleClosePopover}
        >
          <ProfileDropdown
            onLinkClick={handleClosePopover}
            onLogout={onLogout}
          />
        </Popover>
      </>
    );
  };
  const isAdmin = role === "super admin" ? "admin" : role;
  return (
    <div className={`header header-${isAdmin}`}>
      <div className={"header__left"}>
        <div className={"header__block"}>
          <Link className="header__logo-outer" to={resolveHomepageByRole(role)}>
            <Logo />
          </Link>
          <div className={"header__navigation"}>
            {renderNavigationByRole(role, permissions)}
          </div>
        </div>
        <div className={"header__actions"}>
          {role === "pharmacist" && renderCallCenterBlock()}
          {role === "doctor" && renderNotificationsBlock()}
          <LangSwitcher />
        </div>
      </div>
      {status && (
        <Tooltip title={"Click to change your status"} arrow>
          <div className={"header__center"}>
            <div className={"work-status"} onClick={handleDoctorStatusUpdate}>
              <div className="work-status__left">
                {status.key === "1" ? (
                  <img src={sleep} alt="" />
                ) : (
                  <QueryBuilder />
                )}
              </div>
              <div className="work-status__right">
                <div className="work-status__title">Work status:</div>{" "}
                <div className={"work-status__value"}>{status.val}</div>
              </div>
            </div>
          </div>
        </Tooltip>
      )}
      <div className={"header__right"}>
        {role === "admin" || role === "super admin" ? (
          <ExitToApp
            onClick={onLogout}
            className={"header__icon"}
            fontSize={"large"}
          />
        ) : (
          renderProfilePreview()
        )}
      </div>
    </div>
  );
};

export default Header;
