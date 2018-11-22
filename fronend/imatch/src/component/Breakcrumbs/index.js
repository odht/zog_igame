import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

const routes = [
  { path: '/', breadcrumb: '首页' },
  { path: '/details/dhome', breadcrumb: '比赛信息' },
  { path: '/details/team', breadcrumb: '参赛队' },
  { path: '/details/grade', breadcrumb: '成绩' },
  { path: '/details/grade/graresult', breadcrumb: '本轮详情' },
  { path: '/details/grade/graresult/round', breadcrumb: '桌' },
  { path: '/details/grade/graresult/teamMatch', breadcrumb: '队伍' },
  { path: '/details/grade/graresult/deal', breadcrumb: '牌' },
  
];

export default withBreadcrumbs(routes)(({ breadcrumbs, state }) => (
  <div>
    {breadcrumbs.map((breadcrumb, index) => (
      breadcrumb.key !== '/details' ?
        <span key={breadcrumb.key}>
          <NavLink
            to={{
              pathname: breadcrumb.props.match.url,
              state: state,
            }}>
            {breadcrumb}
          </NavLink>
          {(index < breadcrumbs.length - 1) && <i> / </i>}
        </span> : ''
    ))}
  </div>
));