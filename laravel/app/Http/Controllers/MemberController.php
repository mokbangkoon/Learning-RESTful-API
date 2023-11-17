<?php
// app/Http/Controllers/MemberController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Member;
use App\Models\Solution;

class MemberController extends Controller
{
    public function getAllMembers(Request $request)
    {
        $limit = $request->query('limit', 10);
        $members = Member::orderBy('identificationNumber','asc')->paginate($limit);
        return response()->json($members);
    }

    public function getMember($id)
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json(['message' => '해당 직원은 없습니다.'], 404);
        }
        return response()->json($member);
    }

    public function createMember(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:15',
            'teamName' => 'required|string|max:15',
            'phoneNumber' => 'string|max:15',
        ], [
            'required' => ':attribute은(는) 필수 항목입니다.',
            'string' => ':attribute은(는) 문자열 타입이어야 합니다.',
            'max' => ':attribute은(는) 최대 :max자까지만 입력 가능합니다.',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 400);
        }

        $member = Member::create($request->all());
        return response()->json(['message' => '등록 완료', 'identificationNumber' => $member->id], 201);
    }

    public function updateMember(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:15',
            'teamName' => 'string|max:15',
            'phoneNumber' => 'string|max:15',
        ], [
            'string' => ':attribute은(는) 문자열 타입이어야 합니다.',
            'max' => ':attribute은(는) 최대 :max자까지만 입력 가능합니다.',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 400);
        }

        $member = Member::find($id);
        if (!$member) {
            return response()->json(['message' => '해당 직원은 없습니다.'], 404);
        }

        $member->update($request->all());
        return response()->json(['message' => '수정 완료', 'identificationNumber' => $member->identificationNumber]);
    }

    public function deleteMember($id)
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json(['message' => '해당 직원은 없습니다.'], 404);
        }
        $member->delete();
        return response()->json(['message' => '삭제 완료', 'identificationNumber' => $id]);
    }
}