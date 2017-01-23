import React, {Component} from 'react';
import {observer} from 'mobx-react';

const Link = ({view, className, params = {}, queryParams = {}, store = {}, refresh = false, style = {}, activeStyle = {}, activeClassName = '', children, title = children, router = store.router}) => {
  if (!router) {
    return console.error('The router prop must be defined for a Link component to work!')
  }

  // TODO - Do an actual comparison here (dont think object refs will be the same?)
  const isCurrentView = router.currentView === view 
    && router.params === params 
    && router.queryParams === queryParams;
  const currentStyle = isCurrentView ? { ...style, ...activeStyle } : style;
  const currentClassName = isCurrentView ? `${className} ${activeClassName}` : className;

  return (<a
      style={currentStyle}
      className={currentClassName}
      onClick={e => {
        const middleClick = e.which == 2;
        const cmdOrCtrl = (e.metaKey || e.ctrlKey);
        const openinNewTab = middleClick || cmdOrCtrl;
        const shouldNavigateManually = refresh || openinNewTab || cmdOrCtrl;

        if (!shouldNavigateManually) {
          e.preventDefault();
          router.goTo(view, params, store, queryParams);
        }
      }}
      href={view.replaceUrlParams(params, queryParams)}>
      {title}
    </a>
  )
}

export default observer(Link);