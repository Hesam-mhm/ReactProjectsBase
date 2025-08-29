import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { toAbsoluteUrl } from '../../../helpers';
import { useLayout } from '../../core';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ToggleComponent } from '../../../assets/ts/components';
import { useTheme } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import { SolarRoundAltArrowRightBold } from '../../../../app/Iconify/SolarRoundAltArrowRightBold';
import { SolarRoundAltArrowLeftBold } from '../../../../app/Iconify/SolarRoundAltArrowLeftBold';
import { COLORS } from '../../../partials/layout/theme-mode/styled/constants';

type PropsType = {
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
};

const SidebarLogo = (props: PropsType) => {
  const { config } = useLayout();
  const toggleRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(!config.app?.sidebar?.default?.minimize?.desktop?.default);

  const appSidebarDefaultMinimizeDesktopEnabled = config?.app?.sidebar?.default?.minimize?.desktop?.enabled;
  const appSidebarDefaultCollapseDesktopEnabled = config?.app?.sidebar?.default?.collapse?.desktop?.enabled;
  const toggleType = appSidebarDefaultCollapseDesktopEnabled ? 'collapse' : appSidebarDefaultMinimizeDesktopEnabled ? 'minimize' : '';
  const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? 'active' : '';
  const appSidebarDefaultMinimizeDefault = config.app?.sidebar?.default?.minimize?.desktop?.default;

  useEffect(() => {
    setTimeout(() => {
      const toggleObj = ToggleComponent.getInstance(toggleRef.current!) as ToggleComponent | null;

      if (!toggleObj) return;

      toggleObj.on('kt.toggle.change', function () {
        props.sidebarRef.current!.classList.add('animating');

        setTimeout(function () {
          props.sidebarRef.current!.classList.remove('animating');
          setIsExpanded((prev) => !prev); // Toggle state
        }, 300);
      });
    }, 600);
  }, [toggleRef, props.sidebarRef]);

  const theme = useTheme();

  return (
    <>
      <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo" style={{ backgroundColor: theme.palette.background.paper }}>
        <Link to="/Home">
          {config.layoutType === 'dark-sidebar' ? (
            <img alt="Logo" src={toAbsoluteUrl('media/logos/Nano-Mahyar-Logo.svg')} className="h-25px app-sidebar-logo-default" />
          ) : (
            <>
              <img alt="Logo" src={toAbsoluteUrl('media/logos/Nano-Mahyar-Logo.svg')} className="h-40px app-sidebar-logo-default theme-light-show" />
              <img alt="Logo" src={toAbsoluteUrl('media/logos/Nano-Mahyar-Logo.svg')} className="h-40px app-sidebar-logo-default theme-dark-show" />
            </>
          )}

          <img alt="Logo" src={toAbsoluteUrl('media/logos/Nano-Mahyar-Logomark.svg')} className="h-40px app-sidebar-logo-minimize" />
        </Link>
      </div>

      {/* {(appSidebarDefaultMinimizeDesktopEnabled ||
        appSidebarDefaultCollapseDesktopEnabled) && (
        <div
          ref={toggleRef}
          id="kt_app_sidebar_toggle"
          className={clsx(
            "app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary position-absolute bottom-0 start-50 translate-middle-x mb-4",
            { active: appSidebarDefaultMinimizeDefault }
          )}
          data-kt-toggle="true"
          data-kt-toggle-state={toggleState}
          data-kt-toggle-target="body"
          data-kt-toggle-name={`app-sidebar-${toggleType}`}
          style={{
            minWidth: "auto",
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {isExpanded ? (
              <SolarRoundAltArrowRightBold
                style={{ fontSize: "20px", color: COLORS.SECONDARY.MAIN }}
              />
            ) : (
              <SolarRoundAltArrowLeftBold
                style={{ fontSize: "20px", color: COLORS.SECONDARY.MAIN }}
              />
            )}

            {isExpanded && (
              <Typography
                variant="h5"
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                بستن منو
              </Typography>
            )}
          </Stack>
        </div>
      )} */}
    </>
  );
};

export { SidebarLogo };
