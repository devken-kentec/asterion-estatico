import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Periodo } from "../app/domain/periodo.domain";
import { DescricaoReceita } from "../app/domain/descricao-receita.domain";
import { DescricaoDespesa } from "../app/domain/descricao-despesa.domain";
import { ToastrService } from "ngx-toastr";
import { Carteira } from "../app/domain/carteira.domain";
import { Observable } from "rxjs";
import { User } from "../app/domain/user.domain";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private readonly api = environment.api;
  private http = inject(HttpClient);
  private toastrService = inject(ToastrService);
  private tokenRequisicao: string = '';

  private autenticacao!: string;
  private role!        : string;
  private nomeUsuario! : string;
  private chaveUsuario!: string;

  public token: string[] = [
    "df31aa93-e77f-416e-abde-256795c175b8",
    "61a320fe-a50b-45c0-b9bd-a848e1bf6309",
    "90f228a8-2a69-42ae-99a2-eb9dd2c4d803",
    "265863d3-eac2-429f-b5ee-499c85a7300b",
    "a1f63f7d-99a3-4e5e-83d3-3eb56094483e",
    "d1aad966-5e4f-4141-8ba0-f01eea9c072f",
    "18f2b3da-b4b7-4a40-a1f6-6dbcfd851e2f",
    "5d193423-824c-4f76-9d24-3412ebd9983a",
    "ca7465b8-efb5-43c6-9d42-38e38d6128fe",
    "eb3bf0a8-ab3d-470d-841d-f7055e89afa3",
    "5c898b29-3a8e-4372-937c-5fc821ff91d8",
    "4115b65d-38d9-4192-a8e8-2d99c945b38a",
    "cd9e8190-31ed-4c1f-9aea-90c0bda99e73",
    "d362776c-f1e1-4e0a-8550-feed7dcb9fc2",
    "5be582be-c888-4cdc-94d1-059cf11c81ef",
    "6e8f2b62-b84c-477b-afc8-1daf20af8883",
    "637bb799-e4e2-465f-b004-6575419abc27",
    "2b9e8e15-94c9-46ef-baf4-517283b652e8",
    "b463d973-9bf9-4cb6-a5e2-a978e76cdf35",
    "e12bd8a5-0b1c-4c90-bc0f-61afef85171e",
    "ca028b04-f16b-4927-a8cb-d3f7a46e80f9",
    "a66107bd-2aaf-4fbe-9ea1-78eb3854b0fa",
    "38fc2a55-15b9-48d1-89cb-76b1142a09d7",
    "f6b13fd6-16f2-4ca6-a09c-70eabfd1a170",
    "c462a870-8bfe-484a-936b-24052935df89",
    "32f7d1f9-68df-4c82-be11-11acd6b52ba6",
    "429a8615-6c6d-433a-9b9c-3914e7680195",
    "9327d094-b288-4b84-ad7f-c119b7664a89",
    "f0ea70b3-8887-479f-8cff-a62eea323fc3",
    "3f15f5b3-52e5-402c-829f-3d98739b185a",
    "861dde3a-1df4-45ec-8eee-0b4fa364b8c9",
    "cce6f00a-98fa-4611-a664-8151ce20411f",
    "94a94e4b-a75c-42e3-9911-a39865c0ad1d",
    "14eeec1a-ea72-459b-94f5-b7910cd5e40b",
    "624b4850-2813-428f-a838-fa7d214f2d6a",
    "fc5483a6-3757-4b4b-a8ce-8e155224cb50",
    "2906a89c-679c-425e-b971-2abd8786f500",
    "4d02efb6-71db-487e-bd5b-a2bad03bea34",
    "93eb5555-668f-40b4-b8cf-5d6e3a598524",
    "e74828d3-ffd5-4219-82e2-f04949609dba",
    "6e1780da-bd3b-48e2-acf2-34d0f43648c1",
    "b0b957f2-9aa7-4c9f-8980-dc0374995ad3",
    "3466aa6c-7718-444d-95d6-e649eced0756",
    "316a7154-2df7-40ee-ad51-9e626e87608a",
    "53a3a38a-aa0a-4860-a351-eaacd956ccc7",
    "e11f721c-bca8-4f72-a770-71505cc919ca",
    "5f0e6697-e769-4401-89a0-7b7ae6c68ee7",
    "ccc4a64c-9a8c-4aab-9b87-a2749a2db85d",
    "166a7111-0805-4de5-8535-0f12f462c3e6",
    "62b3e8ff-9f72-42f9-943d-283b1c555dc8",
    "7c50967d-8475-4417-a9d9-6557fa673c07",
    "a248eb80-82af-495c-8d0c-cfcdfb0c96a4",
    "11da04b9-2a9f-4312-8711-dfcc39703aa6",
    "2792e461-be6d-4d52-ae4c-c56a286f9bac",
    "8c68bbb2-fbfb-4a16-8602-8cdf90e3daf5",
    "2b7183e3-9254-4af4-88ec-2557422666e9",
    "88396294-357e-4eed-b2c0-96d73993820e",
    "6d363d70-9796-4642-bb50-0fbbebb3e96d",
    "7e2c306c-a47e-4369-b0ea-63bb1e41cd9a",
    "7fac4679-160b-482e-9f75-1cb307ece0dd",
    "84872e99-6abb-4098-bacc-a00c462104af",
    "8d105ea1-453f-4f69-9293-78aa3b63ce75",
    "58c92470-8dbc-4b61-b5d7-021064441255",
    "401ca543-b589-4e43-9692-f68647ace48f",
    "1489a811-0e26-483f-a6e6-de16eb390dea",
    "464b6fbe-1ea6-4999-a769-30b05bc9e4ea",
    "48063a4d-7807-4c08-85f3-2740cc5899bf",
    "0b6cace0-440e-4ec6-a3ed-624ec5b85109",
    "a3e214a2-33a3-466e-9bfd-23e0842a24a3",
    "701c977d-4576-45fe-b87a-2811238ae415",
    "d49a4fc6-8764-425d-8e36-a01475805e6e",
    "a0b72e8c-15b2-45b0-8b31-56b8db91ed69",
    "8244355e-74ea-43f5-82fe-e70fe3c9d02e",
    "bf0b59dd-bc44-4e98-b983-84778dbc2d7e",
    "c91e586d-e52f-40f1-92aa-3cafba74ef9b",
    "1503a511-815c-4be6-bf8e-5ccbf220445a",
    "1236e228-7561-42c8-ae17-49a0e1ba9f13",
    "258eb7ca-a4f0-4758-8a7b-010752b11c3c",
    "4af74d98-fb4b-4d94-bebf-b9b192e73c50",
    "3d45cfab-61e9-4e05-af95-8ec4a1577ef0",
    "d0bdacce-884d-47c9-a059-fc6b1be18041",
    "9cb56ffc-a07c-45f0-a7b7-1789b1d2ad12",
    "09e681f0-3b0f-490c-85a8-eb051295e552",
    "a7b88ac2-d0be-4d6e-b913-5ed9e651981d",
    "041f6eaf-ef6a-4fbe-a217-e84ad6bdd3a0",
    "63cff7bc-0b1f-4f1c-8adc-14b04d8b1e69",
    "0b6f07e8-573d-4466-b74e-9c1447b5985f",
    "473eae0d-1f1d-4325-beb6-92b18dd9ca01",
    "c686d934-70c8-4f2b-a4a4-48c788738e17",
    "10add52a-ab64-42f0-aa0b-bccd7db80e5f",
    "79a55589-7e64-41ff-a801-05b3734167cc",
    "8b0129fc-5fe0-4544-a703-3c6cdf1eaaaf",
    "08b37e02-c631-4a81-a3fd-111145dfc136",
    "b9b7aa8a-efc7-4e41-b095-8d8fe2e3ef40",
    "22bc894e-1b37-430f-acee-730ed9a5b62b",
    "fa7e5152-8f55-4e6a-81f8-267324e3f887",
    "1ad8dfd0-d351-4069-b429-79b0cf21f274",
    "8ebdb2d4-9a7f-43e5-a57d-3ae96ad019e6",
    "34a136f0-21a5-4fa8-a6be-d8ffd89e0dbf",
    "7e598972-e8b2-4f6f-a5c9-680cf8de443c"
  ];

  public stringParaHexadecimal(senha: string): string {
    return senha.split('')
    .map(char => char.charCodeAt(0).toString(16))
    .join('');
  }

  public encryptionPassword(senha: string): string {
    let pass: string ="";
    let newPass: string[] = new Array<string>(16);

      newPass[0] = senha.substring(0,1);
      newPass[1] = this.gerarCaracterAleatorio();
      newPass[2] = senha.substring(1,2);
      newPass[3] = this.gerarCaracterAleatorio();
      newPass[4] = senha.substring(2,3);
      newPass[5] = this.gerarCaracterAleatorio();
      newPass[6] = senha.substring(3,4);
      newPass[7] = this.gerarCaracterAleatorio();
      newPass[8] = senha.substring(4,5);
      newPass[9] = this.gerarCaracterAleatorio();
      newPass[10] = senha.substring(5,6);
      newPass[11] = this.gerarCaracterAleatorio();
      newPass[12] = senha.substring(6,7);
      newPass[13] = this.gerarCaracterAleatorio();
      newPass[14] = senha.substring(7,8);
      newPass[15] = this.gerarCaracterAleatorio();
      pass = newPass.toString().replaceAll("empty", "a").replaceAll(',', '');
    return pass;
  }

  public gerarCaracterAleatorio(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    return caracteres.charAt(indiceAleatorio);
  }

    public loginApi(email: string, senha: string): Observable<User> {

    let senhaEncriptada = this.encryptionPassword(senha);
    let convertPass = this.stringParaHexadecimal(senhaEncriptada);

    const headers = new HttpHeaders({
    'Authorization': environment.TOKEN,
    'security'     : convertPass,
    'Content-Type' : 'application/json'
  });
    return this.http.post<User>(`${this.api}/auth/v1/config`, email, {headers});
  }

  public comboboxPeriodoVigente() {
    return this.http.get<Periodo[]>(`${this.api}/asterion/api/v1/periodo/periodoVigente`);
  }

  public comboboxDescricaoReceita() {
    return this.http.get<DescricaoReceita[]>(`${this.api}/asterion/api/v1/descricaoReceita/receitaAtiva`);
  }

  public comboboxDescricaoDespesa() {
    return this.http.get<DescricaoDespesa[]>(`${this.api}/asterion/api/v1/descricaoDespesa/despesaAtiva`);
  }

  public comboboxCarteira() {
    return this.http.get<Carteira[]>(`${this.api}/asterion/api/v1/carteira`);
  }

  saveShow(mensagem: string, titulo: string){
    this.toastrService.success(mensagem, titulo);
  }

  removeShow(mensagem: string, titulo: string){
    this.toastrService.error(mensagem, titulo)
  }

  warningShow(mensagem: string, titulo: string){
    this.toastrService.warning(mensagem, titulo)
  }

}