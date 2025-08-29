import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../app/modules/auth';
import { Languages } from './Languages';
import { toAbsoluteUrl } from '../../../helpers';
import { useIntl } from 'react-intl';

const HeaderUserMenu: FC = () => {
  // const { logout, currentFrappeUser } = useAuth();
  const intl = useIntl();

  return (
    <div
      data-kt-menu="true"
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <img alt="Logo" src={toAbsoluteUrl('media/avatars/user.png')} />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {/* {currentFrappeUser?.first_name} */}
              <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span>
            </div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {/* {currentFrappeUser?.email} */}
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <Link to={'/crafted/pages/profile'} className="menu-link px-5">
          {intl.formatMessage({ id: 'PROFILE.MY_PROFILE' })}
        </Link>
      </div>

      {/* <div className='menu-item px-5'>
        <a href='#' className='menu-link px-5'>
          <span className='menu-text'>My Projects</span>
          <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bolder fs-7'>3</span>
          </span>
        </a>
      </div> */}

      <div className="separator my-2"></div>

      <Languages />

      <div className="menu-item px-5 my-1">
        <Link to="/crafted/account/settings" className="menu-link px-5">
          {intl.formatMessage({ id: 'PROFILE.ACCOUNT_SETTINGS' })}
        </Link>
      </div>

      <div className="menu-item px-5">
        <a onClick={() => {}} className="menu-link px-5">
          {intl.formatMessage({ id: 'AUTH.LOGOUT' })}
        </a>
      </div>
    </div>
  );
};

export { HeaderUserMenu };
