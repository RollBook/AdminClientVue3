import useSysUserStore from './sysUser';
import useSysMenuStore from './sysMenu';

export default function useStore() {
    return {
        // 系统用户
        sysUser:useSysUserStore(),

        // 系统菜单
        sysMenu:useSysMenuStore()
    }
}