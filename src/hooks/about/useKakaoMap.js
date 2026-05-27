import { useEffect } from "react";

export function useKakaoMap({ lat, lng, name, subAddress }) {
    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: 3
            };
            const map = new window.kakao.maps.Map(container, options);

            const markerPosition = new window.kakao.maps.LatLng(lat, lng);
            const marker = new window.kakao.maps.Marker({ position: markerPosition });
            marker.setMap(map);

            const iwContent = `
                <div style="padding:10px; font-size:14px; text-align:center; min-width:150px;">
                    <strong>${name}</strong><br/>
                    <span style="font-size:11px; color:#666;">${subAddress}</span>
                </div>
            `;
            const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent });
            infowindow.open(map, marker);
        }
    }, [lat, lng, name, subAddress]);
}