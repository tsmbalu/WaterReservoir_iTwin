export class WaterReservoirApi{

    public static async getData(){

        const response = await fetch("http://localhost:8080/api/all");
        const data = response.json();

        return data;

    }
}