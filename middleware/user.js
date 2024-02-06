export default async function ({ store, route, error, redirect }) {
  if (route.path === '/') {
    return redirect('/edit')
  }
  if (route.path === '/edit') {
    await store.dispatch('user/setUser');
    const roles = store.state.user.user.roles;
    console.info('roles', roles);
    if (!roles || !roles.find(role => role.type === 'GLOBAL')) {
      error('user is not GLOBAL')
    }
  }
}
