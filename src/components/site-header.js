import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import SVG from './svg';

import './site-header.scss';

export default function SiteHeader() {
  const baseClass = 'site-header',
        brandClass = `${baseClass}__brand`,
        navClass = `${baseClass}__nav`,
        listClass = `${baseClass}__list`,
        listItemClass = `${baseClass}__list-item`,
        linkClass = `${baseClass}__link`;

  return (
    <header className={baseClass}>
      <Link className={brandClass} to="/">
        <SVG viewBox="0 0 73 16">
          <text x="0" y="10" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="start">
            SVG RPG
          </text>
        </SVG>
      </Link>
      <nav className={navClass}>
        <ul className={listClass}>
          <li className={listItemClass}>
            <NavLink className={linkClass} to="/">
              Root
            </NavLink>
          </li>
          <li className={listItemClass}>
            <NavLink className={linkClass} to="/scala">
              Scala
            </NavLink>
          </li>
          <li className={listItemClass}>
            <NavLink className={linkClass} to="/vector">
              Vector
            </NavLink>
          </li>
          <li className={listItemClass}>
            <NavLink className={linkClass} to="/graphium">
              Graphium
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
