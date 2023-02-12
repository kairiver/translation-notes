<?php

namespace App\Http\Controllers;

use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;

class NoteController extends Controller
{
    public function getNotes(): AnonymousResourceCollection
    {
        return NoteResource::collection(Note::all()->sortByDesc("created_at"));
    }

    public function postNotes(Request $request): AnonymousResourceCollection
    {
        // DeepLの結果を取得する
        $url = 'https://api-free.deepl.com/v2/translate';
        $noteText = (string)$request->input('note');
        Log::debug($noteText);
        $params = [
            "text" => $noteText,
            "target_lang" => "EN",
        ];
        $header = [
            "Authorization: DeepL-Auth-Key " . env("DEEPL_AUTH_KEY"),
        ];
        $curl = curl_init($url);
        $options = array(
            // HEADER
            CURLOPT_HTTPHEADER => $header,
            // Method
            CURLOPT_POST => true, // POST
            // body
            CURLOPT_POSTFIELDS => $params,
            // 変数に保存。これがないと即時出力
            CURLOPT_RETURNTRANSFER => true,
            // header出力
            CURLOPT_HEADER => true,
        );

        curl_setopt_array($curl, $options);
        $response = curl_exec($curl);
        $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE); // ヘッダサイズ取得
        $header = substr($response, 0, $header_size); // header切出
        $header = array_filter(explode("\r\n", $header));
        $json = substr($response, $header_size); // body切出
        $result = json_decode($json, true);
        $translation = $result['translations'][0]['text'];
        Log::debug($translation);

        $note = new Note();
        $note->note = $noteText;
        $note->translation = $translation;
        $note->created_at = now();
        $note->updated_at = now();
        $note->save();

        return NoteResource::collection(Note::all()->sortByDesc("created_at"));
    }

    public function deleteNotes(Request $request): AnonymousResourceCollection
    {
        Note::destroy($request->input('id'));

        return NoteResource::collection(Note::all()->sortByDesc("created_at"));
    }
}
